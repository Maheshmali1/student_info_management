"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const utils_1 = require("../utils");
const app = (0, utils_1.createServer)();
var accessToken = '';
var refreshToken = '';
var newAccessToken = '';
var newRefreshToken = '';
describe('User authentication test suite', () => {
    // user registration
    describe('given that user registration successful', () => {
        it('should return 201', async () => {
            const { statusCode } = await (0, supertest_1.default)(app).post('/user/register').send({
                "username": "mahesh",
                "password": "password123"
            });
            expect(statusCode).toBe(201);
        });
    });
    // user login test cases.
    // user login successful.
    describe('given that user login successful', () => {
        it('should return 200 and accessToken and refreshToken', async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app).post('/user/login').send({
                "username": "mahesh",
                "password": "password123"
            });
            accessToken = 'bearer ' + body.message.accessToken;
            refreshToken = body.message.refreshToken;
            expect(statusCode).toBe(200);
        });
    });
    // user login failed due to invalid username.
    describe('given that user login failed due to invalid username', () => {
        it('should return 404 and error message', async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app).post('/user/login').send({
                "username": "mahesh1",
                "password": "password123"
            });
            expect(statusCode).toBe(404);
            expect(body.message).toEqual("could not find User with given username.");
        });
    });
    // user login failed due to invalid password.
    describe('given that user login failed due to invalid password', () => {
        it('should return 401 and error message', async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app).post('/user/login').send({
                "username": "mahesh",
                "password": "password1234"
            });
            expect(statusCode).toBe(401);
            expect(body.message).toEqual("Password Incorrect!");
        });
    });
    // getting new accessToken after previous has expired.
    describe('given that refreshToken is valid', () => {
        it('should return 201 with new accessToken and refreshToken', async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app).post('/user/refreshToken').send({
                "username": "mahesh123",
                "token": refreshToken
            });
            newAccessToken = 'bearer ' + body.message.accessToken;
            newRefreshToken = body.message.refreshToken;
            expect(statusCode).toBe(201);
        });
    });
    // getting new accessToken after previous has expired but failed due to invalid refreshToken.
    describe('given that refreshToken is invalid', () => {
        it('should return 500 with error message', async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app).post('/user/refreshToken').send({
                "username": "mahesh123",
                "token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFoZXNoMTIzIiwiaWF0IjoxNjg2NDkwNDM1LCJleHAiOjE2ODY0OTEzMzV9.Zw2-az-EjtSqlHnlAYdOv_oxmY5MlL2Rrw9ebEgTZPMMm'
            });
            expect(statusCode).toBe(500);
            expect(body.message).toEqual("Refresh token Invalid..");
        });
    });
});
describe('Student CRUD test suite', () => {
    // create(POST) student testcases.
    describe('Create student test cases(POST)', () => {
        // creation is succcessful
        describe('given that the creation of student is successful', () => {
            it('should reuturn 201 with success message', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).post('/student').set('Authorization', accessToken).send({
                    'name': 'mahesh',
                    'email': 'mahesh@gmail.com',
                    'phoneNo': '9765040510'
                });
                expect(statusCode).toBe(201);
                expect(body.message).toEqual("student added successfully.");
            });
        });
        // Invalid type testing:
        // Invalid type of name (expected string)
        describe('given that creation of student is failed due to invalid type of field - name', () => {
            it('should return 422 with error', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).post('/student').set('Authorization', accessToken).send({
                    'name': 1234,
                    'email': 'mahesh@gmail.com',
                    'phoneNo': '9765040510'
                });
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must be string");
            });
        });
        // Invalid type of email (expected correct email string)
        describe('given that creation of student is failed due to invalid type of field - email', () => {
            it('should return 422 with error', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).post('/student').set('Authorization', accessToken).send({
                    'name': "mahesh mali",
                    'email': 'mahesh@g@mail.com',
                    'phoneNo': '9765040510'
                });
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must match format \"email\"");
            });
        });
        // Invalid type of phoneNo (expected correct 10 digit string)
        describe('given that creation of student is failed due to invalid type of field - phoneNo', () => {
            it('should return 422 with error', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).post('/student').set('Authorization', accessToken).send({
                    'name': "mahesh mali",
                    'email': 'mahesh@gmail.com',
                    'phoneNo': '976504a0510'
                });
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must match pattern \"^[0-9]{10}$\"");
            });
        });
        // Missing type validation
        // name property missing.
        describe('given that creation of student is failed due to missing field - name', () => {
            it('should return 422 with error', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).post('/student').set('Authorization', accessToken).send({
                    'email': 'mahesh@gmail.com',
                    'phoneNo': '9765040510'
                });
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must have required property 'name'");
            });
        });
        // email property missing.
        describe('given that creation of student is failed due to missing field - email', () => {
            it('should return 422 with error', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).post('/student').set('Authorization', accessToken).send({
                    'name': 'mahesh mali',
                    'phoneNo': '9765040510'
                });
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must have required property 'email'");
            });
        });
        // phoneNo property missing.
        describe('given that creation of student is failed due to missing field - phoneNo', () => {
            it('should return 422 with error', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).post('/student').set('Authorization', accessToken).send({
                    'name': 'mahesh mali',
                    'email': 'mahesh@gmail.com'
                });
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must have required property 'phoneNo'");
            });
        });
    });
    // GET student testcases
    describe('Get student test cases(GET)', () => {
        // GET is successful
        describe('Given that GET request successful for given studentId', () => {
            it('should return 200 with student information', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).get('/student/111907001').set('Authorization', accessToken);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    "success": true,
                    "message": {
                        "data": {
                            "_id": expect.any(String),
                            "studentId": 111907001,
                            "name": "mahesh",
                            "email": "mahesh@gmail.com",
                            "phoneNo": "9765040510",
                            "__v": 0
                        }
                    }
                });
            });
        });
        // Given studentId not available.
        describe('Given that GET request is failed as given studentId does not exist', () => {
            it('should return 404 with error message', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).get('/student/111907000').set('Authorization', accessToken);
                expect(statusCode).toBe(404);
                expect(body).toEqual({
                    "success": false,
                    "message": "could not find studnet with given studentId."
                });
            });
        });
    });
    // update (PATCH) student testcases.
    describe('update student test cases(PATCH)', () => {
        // updation is succcessful
        describe('given that the updation of student is successful', () => {
            it('should reuturn 200 with success message', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).patch('/student/111907001').set('Authorization', accessToken).send({
                    'name': 'mahesh mali'
                });
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    "success": true,
                    "message": {
                        "data": {
                            "_id": expect.any(String),
                            "studentId": 111907001,
                            "name": "mahesh mali",
                            "email": "mahesh@gmail.com",
                            "phoneNo": "9765040510",
                            "__v": 0
                        }
                    }
                });
            });
        });
        // Invalid type testing:
        // Invalid type of name (expected string)
        describe('given that updation of student is failed due to invalid type of field - name', () => {
            it('should return 422 with error', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).patch('/student/111907001').set('Authorization', accessToken).send({
                    'name': 1234,
                });
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must be string");
            });
        });
        // Invalid type of email (expected correct email string)
        describe('given that updation of student is failed due to invalid type of field - email', () => {
            it('should return 422 with error', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).patch('/student/111907001').set('Authorization', accessToken).send({
                    'email': 'mahesh@gmail@.com'
                });
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must match format \"email\"");
            });
        });
        // Invalid type of phoneNo (expected correct phoneNo string)
        describe('given that updation of student is failed due to invalid type of field - phoneNo', () => {
            it('should return 422 with error', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).patch('/student/111907001').set('Authorization', accessToken).send({
                    'phoneNo': '97650405e30'
                });
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must match pattern \"^[0-9]{10}$\"");
            });
        });
    });
    // Deletion (DELETE) student testcases.
    describe('deletion student test cases(DELETE)', () => {
        //deletion successful
        describe('Given that deletion is successful', () => {
            it('should return 200 with deleted data as response', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).delete('/student/111907001').set('Authorization', accessToken);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    "success": true,
                    "message": {
                        "data": {
                            "_id": expect.any(String),
                            "studentId": 111907001,
                            "name": "mahesh mali",
                            "email": "mahesh@gmail.com",
                            "phoneNo": "9765040510",
                            "__v": 0
                        }
                    }
                });
            });
        });
        // given studentId doesn't exist
        describe('Given that deletion is failed due to incorrect student id', () => {
            it('should return 404 with error message', async () => {
                const { statusCode, body } = await (0, supertest_1.default)(app).delete('/student/111907000').set('Authorization', accessToken);
                expect(statusCode).toBe(404);
                expect(body.message).toEqual("could not find student with given studentId.");
            });
        });
    });
});
// logout test cases.
describe('User authentication test suite - LogOut', () => {
    // given that logout not sucessful due to invalid accesstoken.
    describe('given that logout is failed due to invalid accessToken', () => {
        it('should return 400 and error message', async () => {
            accessToken = accessToken.split(' ')[1];
            const { statusCode, body } = await (0, supertest_1.default)(app).delete('/user/logout').send({
                "accessToken": accessToken + 'abcd',
                "refreshToken": refreshToken
            });
            expect(statusCode).toBe(400);
            expect(body.message).toEqual("Invalid accessToken provided");
        });
    });
    // given that logout not sucessful due to invalid refreshtoken.
    describe('given that logout is failed due to invalid refreshtoken', () => {
        it('should return 400 and error message', async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app).delete('/user/logout').send({
                "accessToken": accessToken,
                "refreshToken": refreshToken + 'abcd'
            });
            expect(statusCode).toBe(400);
            expect(body.message).toEqual("Invalid refreshToken provided");
        });
    });
    // given that logout not sucessful due to missing value of refreshToken
    describe('given that logout failed due to missing value of refreshToken', () => {
        it('should return 400 and error message', async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app).delete('/user/logout').send({
                "accessToken": accessToken
            });
            expect(statusCode).toBe(400);
            expect(body.message).toEqual("accessToken and refreshToken both should be present");
        });
    });
    // given that logout not sucessful due to missing value of accessToken
    describe('given that logout failed due to missing value of accessToken', () => {
        it('should return 400 and error message', async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app).delete('/user/logout').send({
                "refreshToken": refreshToken
            });
            expect(statusCode).toBe(400);
            expect(body.message).toEqual("accessToken and refreshToken both should be present");
        });
    });
    // successful logout.
    describe('given that logout is successful', () => {
        it('should return 200', async () => {
            const { statusCode } = await (0, supertest_1.default)(app).delete('/user/logout').send({
                "accessToken": accessToken,
                "refreshToken": refreshToken
            });
            expect(statusCode).toBe(200);
        });
    });
    // successful logout for newly generate refresh and access tokens.
    describe('given that logout is successful', () => {
        it('should return 200', async () => {
            newAccessToken = newAccessToken.split(' ')[1];
            const { statusCode } = await (0, supertest_1.default)(app).delete('/user/logout').send({
                "accessToken": newAccessToken,
                "refreshToken": newRefreshToken
            });
            expect(statusCode).toBe(200);
        });
    });
});
