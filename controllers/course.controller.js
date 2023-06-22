const models = require("../models");
const { course } = models;
const catchAsync = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const Joi = require("joi");
const { Op } = require("sequelize");

const CourseJoiSchema = {
    AddData: Joi.object({
        courseName: Joi.string().trim().normalize().required(),
    }).required(),
    UpdateData: Joi.object({
        courseName: Joi.string().trim().normalize().required(),
    }).required(),
};

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

const addData = catchAsync(async (req, res) => {
    const { courseName } = req.body;
    const result = await course.create({ courseName });
    res.status(201).json({
        status: "success",
        count: result.length,
        data: result,
    });
});

// get all sku-cutomer data
const getAllData = catchAsync(async (req, res, next) => {
    const { courseName, keyword, include, exclude } =
        req.query;
    const page = req.query && req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query && req.query.limit ? parseInt(req.query.limit) : 50;
    const order = req.query && req.query.order ? req.query.order : "ASC";
    const order_by = req.query && req.query.order_by ? req.query.order_by : "id";

    let where = {
        [Op.or]: {
            courseName: {
                [Op.iLike]: `%${keyword ? keyword : "%"}%`,
            },
        },
    };
    if (courseName) {
        where.courseName = courseName;
    }
    let excludeFields = [];
    let includeFields = [];
    let attributes;
    if (include) {
        includeFields = JSON.parse(`${include}`);
        attributes = includeFields;
    }
    if (exclude) {
        excludeFields = exclude;
        attributes = { exclude: excludeFields };
    }
    const result = await course.findAll({
        where,
        limit,
        offset: page * limit,
        order: [[order_by, order]],
        attributes,
    });
    res.status(201).json({
        status: "success",
        count: result.length,
        data: result,
    });
});

//get specific sku customer data by id
const getDataById = catchAsync(async (req, res, next) => {
    const {
        params: { id },
    } = req;
    const result = await course.findOne({
        where: { id },
    });
    if (!result) {
        return next(new AppError("No data found with that ID", 404));
    }
    res.status(201).json({
        status: "success",
        count: result.length,
        data: result,
    });
});

// update sku customer data
const updateData = catchAsync(async (req, res, next) => {
    const {
        body: {
            courseName
        },
        params: { id },
    } = req;

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(
        req.body,
        "courseName",
    );

    const result = await course.update(
        {
            courseName
        },
        { where: { id } }
    );
    res.status(200).json({
        status: "success",
        data: result,
    });
});

// delete a sku customer Data
const deleteDataById = catchAsync(async (req, res, next) => {
    const {
        params: { id },
    } = req;
    await course.destroy({ where: { id } });
    res.status(201).json({
        status: "success",
    });
});

module.exports = {
    addData,
    updateData,
    getAllData,
    getDataById,
    deleteDataById,
    CourseJoiSchema,
};
