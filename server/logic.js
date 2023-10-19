 const db = require('./db')

 //get all the records of employees
 const allEmployees = ()=>{
    return db.Employee.find().then((result)=>{
        if(result){
            return{
                statusCode:200,
                employees:result
            }       
        }
        else{
            return{
                statusCode:401,
                message:"No employee found"
            }
        }
    }) 

   
 }
  // Add a new employee to hte list of employees
  const addEmployee = (id,empname,age,title,position,salary)=>{
    return db.Employee.findOne({id}).then((result)=>{
        if(result){
            return{
                statusCode:401,
                message:"Employee already exists"
            }
        }
        else{
            const newEmployee = new db.Employee({id,empname,age,title,position,salary})
            newEmployee.save();
            return {
                statusCode:200,
                message:"Employee Added Successfully"
            }

        }
    })

}
// logic of deleting the employee
const deleteEmployee = (id)=> {
    return db.Employee.deleteOne({id}).then((response)=>{
        return{
            statusCode:200,
            message:"Employee deleted successfully"
        }
    })
}
const fetchEmployee = (id)=> {
    return db.Employee.findOne({ id }).then((result)=>{
        return{
            statusCode:200,
            employee:result
        }
    })
}
const updateEmployee=(id,empname,title,age,position,salary)=>{
    return db.Employee.findOne({id}).then((result)=>{
        if(result){
            result.id=id,
            result.empname=empname,
            result.title=title,
            result.age=age,
            result.position=position,
            result.salary=salary
            result.save()

            //send response to client
            return {
                statusCode:200,
                message:"Employee data updated successfuly"
            }
        }
        else{
            return{
                statusCode:401,
                message:"No Data Found"
            }
        }
    })
}
 module.exports={
    allEmployees,
    addEmployee,
    deleteEmployee,
    fetchEmployee,
    updateEmployee
 }