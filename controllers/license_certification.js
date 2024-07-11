import { LicenseModel } from "../models/license_certification.js";
import { license_schema } from "../schema/license_schema.js";

// Validation & errror handling
export const license = (req, res) => {
    const { error, value } = license_schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
}