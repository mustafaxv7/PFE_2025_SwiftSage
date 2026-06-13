export const swaggerSpec = {
    openapi: '3.0.3',
    info: {
        title: 'SwiftSage API',
        description: 'Crowdsourcing-based crisis management platform API',
        version: '1.0.0',
    },
    servers: [
        { url: 'https://swiftsage.onrender.com', description: 'Production' },
        { url: 'http://localhost:5030', description: 'Local development' },
    ],
    components: {
        securitySchemes: {
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'token',
                description: 'JWT access token set via httpOnly cookie after login',
            },
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    phone: { type: 'string' },
                    community: { type: 'string' },
                    role: { type: 'string', enum: ['user', 'admin'] },
                },
            },
            Report: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    crisisType: {
                        type: 'string',
                        enum: ['earthquake', 'flood', 'industrial_fire', 'forest_fire'],
                    },
                    status: { type: 'string', enum: ['Active', 'Resolved', 'Critical'] },
                    lat: { type: 'number' },
                    lng: { type: 'number' },
                    reportedBy: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                },
            },
            Alert: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    message: { type: 'string' },
                    description: { type: 'string' },
                    type: { type: 'string', enum: ['info', 'warning', 'danger'] },
                    status: { type: 'string', enum: ['active', 'resolved'] },
                    importance: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
                    location: { type: 'string' },
                    affectedArea: { type: 'string' },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    status: { type: 'string', example: 'error' },
                    code: { type: 'string' },
                    message: { type: 'string' },
                    requestId: { type: 'string' },
                },
            },
        },
    },
    security: [{ cookieAuth: [] }],
    paths: {
        '/auth/register': {
            post: {
                tags: ['Auth'],
                summary: 'Register a new user',
                security: [],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['name', 'email', 'phone', 'password', 'community'],
                                properties: {
                                    name: { type: 'string', minLength: 3, maxLength: 50 },
                                    email: { type: 'string', format: 'email' },
                                    phone: { type: 'string', pattern: '^[0-9+ ]+$' },
                                    password: { type: 'string', minLength: 8 },
                                    community: { type: 'string' },
                                    isOrganisationMember: { type: 'boolean', default: false },
                                },
                            },
                            example: {
                                name: 'John Doe',
                                email: 'john@example.com',
                                phone: '0555123456',
                                password: 'securePass123',
                                community: 'Chlef',
                            },
                        },
                    },
                },
                responses: {
                    201: { description: 'User registered successfully' },
                    400: {
                        description: 'Validation error or duplicate',
                        content: {
                            'application/json': { schema: { $ref: '#/components/schemas/Error' } },
                        },
                    },
                },
            },
        },
        '/auth/login': {
            post: {
                tags: ['Auth'],
                summary: 'Login and receive JWT cookies',
                security: [],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string', format: 'email' },
                                    password: { type: 'string' },
                                },
                            },
                            example: { email: 'john@example.com', password: 'securePass123' },
                        },
                    },
                },
                responses: {
                    200: { description: 'Login successful, sets httpOnly cookies' },
                    400: { description: 'Invalid credentials' },
                },
            },
        },
        '/auth/me': {
            get: {
                tags: ['Auth'],
                summary: 'Get current user profile',
                responses: {
                    200: {
                        description: 'User profile',
                        content: {
                            'application/json': { schema: { $ref: '#/components/schemas/User' } },
                        },
                    },
                    401: { description: 'Not authenticated' },
                },
            },
        },
        '/auth/logout': {
            post: {
                tags: ['Auth'],
                summary: 'Clear session cookies',
                responses: { 200: { description: 'Logged out successfully' } },
            },
        },
        '/api/reports': {
            get: {
                tags: ['Reports'],
                summary: 'List all reports',
                responses: {
                    200: {
                        description: 'Array of reports',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Report' },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ['Reports'],
                summary: 'Create a new report (multipart/form-data)',
                requestBody: {
                    content: {
                        'multipart/form-data': {
                            schema: {
                                type: 'object',
                                required: ['reportData'],
                                properties: {
                                    reportData: {
                                        type: 'string',
                                        description:
                                            'JSON string with lat, lng, title, description, crisisType, userId',
                                    },
                                    reportDetailsData: {
                                        type: 'string',
                                        description: 'JSON string with optional details',
                                    },
                                    additionalData: {
                                        type: 'string',
                                        description: 'JSON string with optional categories',
                                    },
                                    image: { type: 'string', format: 'binary' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: { description: 'Report created' },
                    400: { description: 'Missing required fields' },
                },
            },
        },
        '/api/reports/{id}': {
            get: {
                tags: ['Reports'],
                summary: 'Get report details (admin)',
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
                ],
                responses: {
                    200: { description: 'Report details' },
                    404: { description: 'Report not found' },
                },
            },
        },
        '/api/reports/{id}/status': {
            patch: {
                tags: ['Reports'],
                summary: 'Update report status',
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        enum: ['Active', 'Resolved', 'Critical'],
                                    },
                                },
                            },
                        },
                    },
                },
                responses: { 200: { description: 'Status updated' } },
            },
        },
        '/api/alerts': {
            get: {
                tags: ['Alerts'],
                summary: 'List all alerts',
                responses: {
                    200: {
                        description: 'Array of alerts',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Alert' },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ['Alerts'],
                summary: 'Create a new alert (admin only)',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['message', 'type', 'location', 'affectedArea'],
                                properties: {
                                    message: { type: 'string' },
                                    description: { type: 'string' },
                                    type: { type: 'string', enum: ['info', 'warning', 'danger'] },
                                    location: { type: 'string' },
                                    affectedArea: { type: 'string' },
                                    importance: {
                                        type: 'string',
                                        enum: ['low', 'medium', 'high', 'critical'],
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: { description: 'Alert created' },
                    403: { description: 'Admin only' },
                },
            },
        },
        '/api/alerts/{id}': {
            patch: {
                tags: ['Alerts'],
                summary: 'Update alert (admin only)',
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
                ],
                responses: { 200: { description: 'Alert updated' } },
            },
            delete: {
                tags: ['Alerts'],
                summary: 'Delete alert (admin only)',
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
                ],
                responses: { 200: { description: 'Alert deleted' } },
            },
        },
        '/api/users': {
            get: {
                tags: ['Users'],
                summary: 'List all users (admin only)',
                responses: { 200: { description: 'Array of users' } },
            },
        },
        '/api/feedback': {
            post: {
                tags: ['Feedback'],
                summary: 'Submit feedback',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['message'],
                                properties: {
                                    message: { type: 'string' },
                                    rating: { type: 'integer', minimum: 1, maximum: 5 },
                                },
                            },
                        },
                    },
                },
                responses: { 201: { description: 'Feedback submitted' } },
            },
        },
    },
};
