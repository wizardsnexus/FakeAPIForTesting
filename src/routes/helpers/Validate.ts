import { Request } from "express";

const HOSTS = [
    'localhost:3000',
    'localhost:443',
    'website.com',
];

export const HostIsAllowed = (req: Request): boolean => {
    console.log("HostIsAllowed", (HOSTS.includes(req.header("host") ?? 'NULL')))
    console.log("Host: ", req.header("host") ?? "none")
    return HOSTS.includes(req.header("host") ?? 'NULL')
}

/**
 * 
 * @param {Request} req The HTTP Request object being evaluated.
 * @param {number} expectedArgsCount The exact number of arguments expected
 * @returns {boolean} 
 */
export const ExpectedArgCount = (req: Request, expectedArgsCount: number): boolean => {
    console.log("ExpectedArgCount", (Object.keys(req.query).length <= expectedArgsCount));
    return Object.keys(req.query).length <= expectedArgsCount;
}

export const IsLoggedIn = (req: Request): boolean => {
    console.log("IsLoggedIn", (req.session.UsersName == "User"));
    return (req.session.UsersName == "User");
}

export const BasicValidationApproved = (req: Request, argCount?: number): boolean => {
    console.log("BasicValidationApproved", (HostIsAllowed(req) && ExpectedArgCount(req, argCount ?? 0)));
    return (HostIsAllowed(req) && ExpectedArgCount(req, argCount ?? 0));
} 