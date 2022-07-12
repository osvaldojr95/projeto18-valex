import employeeRepository from "../repositories/employeeRepository.js";

export async function findEmployeeById(id: number) {
    const employee = await employeeRepository.findById(id);
    if (!employee) throw { type: "404" };

    return employee;
}
