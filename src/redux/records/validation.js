/**
 * 
 * @param {object} record 
 * @param {object} props
 */

const validation = (record, props) => {

    const { user } = props;

    if (record && record.role && user && user.role && ['lawyer', 'paralegal'].includes(user.role) && ['superAdmin', 'manager', 'operator', 'medicalExpert', 'QualityTechnician'].includes(record.role)) {
        throw ({ response: { data: { error: 'invalid role' } } });
    }
}

export default validation;