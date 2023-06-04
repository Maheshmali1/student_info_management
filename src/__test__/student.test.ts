import supertest from 'supertest';
import { createServer } from '../utils';

const app = createServer();

describe('Student CRUD test suite',()=>{
    
    // create(POST) student testcases.
    describe('Create student test cases(POST)',()=>{

        // creation is succcessful
        describe('given that the creation of student is successful',()=>{
            it('should reuturn 201 with success message',async()=>{
                const {statusCode,body} = await supertest(app).post('/student').send({
                    'name':'mahesh',
                    'email':'mahesh@gmail.com',
                    'phoneNo':'9765040510'
                })

                expect(statusCode).toBe(201);
                expect(body.message).toEqual("student added successfully.");
            })
        })

        // Invalid type testing:
        // Invalid type of name (expected string)
        describe('given that creation of student is failed due to invalid type of field - name',()=>{
            it('should return 422 with error',async()=>{
                const {statusCode,body} = await supertest(app).post('/student').send({
                    'name':1234,
                    'email':'mahesh@gmail.com',
                    'phoneNo':'9765040510'
                })

                
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must be string");  
            })
        })
        
        // Invalid type of email (expected correct email string)
        describe('given that creation of student is failed due to invalid type of field - email',()=>{
            it('should return 422 with error',async()=>{
                const {statusCode,body} = await supertest(app).post('/student').send({
                    'name':"mahesh mali",
                    'email':'mahesh@g@mail.com',
                    'phoneNo':'9765040510'
                })

                
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must match format \"email\"");  
            })
        })
        
        // Invalid type of phoneNo (expected correct 10 digit string)
        describe('given that creation of student is failed due to invalid type of field - phoneNo',()=>{
            it('should return 422 with error',async()=>{
                const {statusCode,body} = await supertest(app).post('/student').send({
                    'name':"mahesh mali",
                    'email':'mahesh@gmail.com',
                    'phoneNo':'976504a0510'
                })

                
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must match pattern \"^[0-9]{10}$\"");  
            })
        })
        
        // Missing type validation
        // name property missing.
        describe('given that creation of student is failed due to missing field - name',()=>{
            it('should return 422 with error',async()=>{
                const {statusCode,body} = await supertest(app).post('/student').send({
                    'email':'mahesh@gmail.com',
                    'phoneNo':'9765040510'
                })

                
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must have required property 'name'");  
            })
        })
        
        // email property missing.
        describe('given that creation of student is failed due to missing field - email',()=>{
            it('should return 422 with error',async()=>{
                const {statusCode,body} = await supertest(app).post('/student').send({
                    'name':'mahesh mali',
                    'phoneNo':'9765040510'
                })

                
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must have required property 'email'");  
            })
        })
        
        // phoneNo property missing.
        describe('given that creation of student is failed due to missing field - phoneNo',()=>{
            it('should return 422 with error',async()=>{
                const {statusCode,body} = await supertest(app).post('/student').send({
                    'name':'mahesh mali',
                    'email':'mahesh@gmail.com'
                })

                
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must have required property 'phoneNo'");  
            })
        })
        
    })
    
    // GET student testcases
    describe('Get student test cases(GET)',()=>{
        
        // GET is successful
        describe('Given that GET request successful for given studentId',()=>{
            it('should return 200 with student information',async()=>{
                const {statusCode,body} = await supertest(app).get('/student/111907001');

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
            })
        })

        // Given studentId not available.
        describe('Given that GET request is failed as given studentId does not exist',()=>{
            it('should return 404 with error message',async()=>{
                const {statusCode,body} = await supertest(app).get('/student/111907000');
                
                expect(statusCode).toBe(500);
                expect(body).toEqual({
                    "success": false,
                    "message": "could not find studnet with given studentId."
                });
            })
        })
        
    })
    
    // update (PATCH) student testcases.
    describe('update student test cases(PATCH)',()=>{

        // updation is succcessful
        describe('given that the updation of student is successful',()=>{
            it('should reuturn 200 with success message',async()=>{
                const {statusCode,body} = await supertest(app).patch('/student/111907001').send({
                    'name':'mahesh mali'
                })

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
            })
        })

        // Invalid type testing:
        // Invalid type of name (expected string)
        describe('given that updation of student is failed due to invalid type of field - name',()=>{
            it('should return 422 with error',async()=>{
                const {statusCode,body} = await supertest(app).patch('/student/111907001').send({
                    'name':1234,
                })
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must be string");  
            })
        })
        
        // Invalid type of email (expected correct email string)
        describe('given that updation of student is failed due to invalid type of field - email',()=>{
            it('should return 422 with error',async()=>{
                const {statusCode,body} = await supertest(app).patch('/student/111907001').send({
                    'email':'mahesh@gmail@.com'
                })
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must match format \"email\"");  
            })
        })
        
        // Invalid type of phoneNo (expected correct phoneNo string)
        describe('given that updation of student is failed due to invalid type of field - phoneNo',()=>{
            it('should return 422 with error',async()=>{
                const {statusCode,body} = await supertest(app).patch('/student/111907001').send({
                    'phoneNo':'97650405e30'
                })
                expect(statusCode).toBe(422);
                expect(body.message.message).toEqual("must match pattern \"^[0-9]{10}$\"");  
            })
        })
        
        
        
    })

    // Deletion (DELETE) student testcases.
    describe('deletion student test cases(DELETE)',()=>{
        
        //deletion successful
        describe('Given that deletion is successful',()=>{
            it('should return 200 with deleted data as response',async()=>{
                const {statusCode,body} = await supertest(app).delete('/student/111907001');

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
                })
            })
        })

        // given studentId doesn't exist
        
        describe('Given that deletion is failed due to incorrect student id',()=>{
            it('should return 404 with error message',async()=>{
                const {statusCode,body} = await supertest(app).delete('/student/111907000');

                expect(statusCode).toBe(500);
                expect(body.message).toEqual("could not find student with given studentId.");
            })
        })
    })
})