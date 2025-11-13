/**
 * 
 * Route Switcher
 * 
 */

import customerRoute from "../../routes/customer";
import anonymousRoute from "../../routes/anonymousRoute";
import adminRoute from "../../routes/adminRoute";
import fileUploaderRoute from "../../routes/fileUploader";

const routeSwitcher = (user, loggedIn, callback = {}) => {

  if (!loggedIn) {
    return anonymousRoute(callback);
  }
  switch (user.routes) {
    case 'superAdmin':
      return adminRoute(callback, user);
    case 'fileUploader':
      return fileUploaderRoute(callback, user);
    case 'admin':
      return customerRoute(callback, user);
    default:
      return anonymousRoute(callback);
  }
};

export default routeSwitcher;