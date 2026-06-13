export const success = (res, data, statusCode = 200) => {
    return res.status(statusCode).json({
        status: 'success',
        data,
    });
};

export const created = (res, data) => {
    return success(res, data, 201);
};

export const paginated = (res, { items, total, page, limit }) => {
    return res.status(200).json({
        status: 'success',
        data: items,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        },
    });
};
