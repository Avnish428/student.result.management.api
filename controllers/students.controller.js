const models = require("../models");
const { students } = models;
const catchAsync = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const Joi = require("joi");
const { Op } = require("sequelize");

const StudentJoiSchema = {
  AddData: Joi.object({
    firstName: Joi.string().trim().normalize().required(),
    familyName: Joi.string().trim().normalize().optional(),
    dob: Joi.string().trim().normalize().optional(),
    email: Joi.string().email().trim().normalize().required(),
  }).required(),
  UpdateData: Joi.object({
    firstName: Joi.string().trim().normalize().required(),
    familyName: Joi.string().trim().normalize().optional(),
    dob: Joi.string().trim().normalize().optional(),
    email: Joi.string().email().trim().normalize().required(),
  }).required(),
};

const addData = catchAsync(async (req, res) => {
    const { firstName, familyName, dob, email } = req.body;
    const result = await students.create({ firstName, familyName, dob, email:email.toLowerCase()});
    res.status(201).json({
        status: "success",
        count: result.length,
        data: result,
    });
});

// get all sku-cutomer data
const getAllData = catchAsync(async (req, res, next) => {
    const { firstName, familyName, email, keyword, include, exclude } =
        req.query;
    const page = req.query && req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query && req.query.limit ? parseInt(req.query.limit) : 50;
    const order = req.query && req.query.order ? req.query.order : "ASC";
    const order_by = req.query && req.query.order_by ? req.query.order_by : "id";

    let where = {
        [Op.or]: {
            firstName: {
                [Op.iLike]: `%${keyword ? keyword : "%"}%`,
            },
            familyName: {
                [Op.iLike]: `%${keyword ? keyword : "%"}%`,
            },
            email: {
                [Op.iLike]: `%${keyword ? keyword : "%"}%`,
            },
        },
    };
    if (firstName) {
        where.firstName = firstName;
    }
    if (email) {
        where.email = email;
    }
    if (familyName) {
        where.familyName = familyName;
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
    const result = await students.findAll({
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
    const result = await students.findOne({
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
            firstName, familyName, email, dob
        },
        params: { id },
    } = req;


    const result = await students.update(
        {
            firstName, familyName, email, dob
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
    await students.destroy({ where: { id } });
    await
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
    StudentJoiSchema,
};
