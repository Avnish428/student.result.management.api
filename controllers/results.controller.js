const models = require("../models");
const { results, course, students } = models;
const catchAsync = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const Joi = require("joi");

const ResultJoiSchema = {
    AddData: Joi.object({
        courseId: Joi.number().required(),
        studentId: Joi.number().required(),
        score: Joi.string().required(),
    }).required(),
    UpdateData: Joi.object({
        courseId: Joi.number().required(),
        studentId: Joi.number().required(),
        score: Joi.string().required(),
    }).required(),
};

//add data
const addData = catchAsync(async (req, res) => {
    const { courseId, studentId, score } = req.body;
    const result = await results.create({ courseId, studentId, score });
    res.status(201).json({
        status: "success",
        count: result.length,
        data: result,
    });
});

// get all data
const getAllData = catchAsync(async (req, res, next) => {
    const { score, keyword, include, exclude } =
        req.query;
    const page = req.query && req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query && req.query.limit ? parseInt(req.query.limit) : 50;
    const order = req.query && req.query.order ? req.query.order : "ASC";
    const order_by = req.query && req.query.order_by ? req.query.order_by : "id";


    let where = {};
    if (score) {
        where.score = score;
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
    const includes = [
        { model: course, attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] } },
        { model: students, attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] } },
    ];
    const result = await results.findAll({
        where,
        limit,
        offset: page * limit,
        order: [[order_by, order]],
        attributes,
        include: includes
    });
    res.status(201).json({
        status: "success",
        count: result.length,
        data: result,
    });
});

// delete Data
const deleteDataById = catchAsync(async (req, res, next) => {
    const {
        params: { id },
    } = req;
    await results.destroy({ where: { id } });
    res.status(201).json({
        status: "success",
    });
});

module.exports = {
    addData,
    getAllData,
    deleteDataById,
    ResultJoiSchema,
};
