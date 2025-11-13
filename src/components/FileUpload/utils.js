/**
 * 
 * Utils
 * 
 */

import React, { useState } from 'react';
import useStyles from './styles';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Modal, Paper, Fade, Grid, Typography, Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/system";
// import SVG from 'react-inlinesvg';

export function getSteps() {
  return ['Uploading Document', 'Converting Document', 'Creating Template'];
}

export const extensionsToMimeTypes = (extensions) => {
  const mimeTypeMap = {
    '.csv': 'text/csv',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xlsb': 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    '.xlsm': 'application/vnd.ms-excel.sheet.macroEnabled.12',
    '.mp4': 'video/mp4',
    '.pdf': 'application/pdf',
    '.gif': 'image/gif',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.jng': 'image/x-jng',
    '.bmp': 'image/x-ms-bmp',
    '.webp': 'image/webp',
    '.wbmp': 'image/vnd.wap.wbmp',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.svgz': 'image/svg+xml',
    '.tiff': 'image/tiff',
    '.tif': 'image/tiff',
    '.3gpp': 'video/3gpp',
    '.3gp': 'video/3gpp',
    '.mpeg': 'video/mpeg',
    '.mpg': 'video/mpeg',
    '.asx': 'video/x-ms-asf',
    '.asf': 'video/x-ms-asf',
    '.mov': 'video/quicktime',
    '.ogg': 'video/ogg',
    '.wmv': 'video/x-ms-wmv',
    '.webm': 'video/webm',
    '.flv': 'video/x-flv',
    '.avi': 'video/x-msvideo',
    '.m4v': 'video/x-m4v',
    '.mng': 'video/x-mng',
    '.doc': 'application/msword',
    '.dot': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    '.docm': 'application/vnd.ms-word.document.macroEnabled.12',

    // Add more mappings as needed
  };

  const result = {};

  // extensions.forEach((extension) => {
  //   const mimeType = mimeTypeMap[extension];
  //   if (mimeType) {
  //     result[mimeType] = [extension];
  //   }
  // });

  extensions.forEach((extension) => {
    if (extension === 'image/*') {
      // Handle wildcard for image types
      Object.entries(mimeTypeMap).forEach(([ext, mimeType]) => {
        if (mimeType.startsWith('image')) {
          result[mimeType] = result[mimeType] || [];
          result[mimeType].push(ext);
        }
      });
    } else {
      const mimeType = mimeTypeMap[extension];
      if (mimeType) {
        result[mimeType] = (result[mimeType] || []).concat(extension);
      }
    }
  });

  return result;
};

/**
 * 
 * @param {string} name 
 * @returns 
 */
export function getContentType(name) {
  const extension = name && name.substring(name.lastIndexOf('.') + 1).toLowerCase() || '';
  if (extension === 'pdf') {
    return 'application/pdf'
  } else if (extension === 'mp4') {
    return 'video/mp4'
  } else if (extension === 'gif') {
    return 'image/gif'
  } else if (extension === 'png') {
    return 'image/png'
  } else if (extension === 'ico') {
    return 'image/x-icon'
  } else if (extension === 'jng') {
    return 'image/x-jng'
  } else if (extension === 'bmp') {
    return 'image/x-ms-bmp'
  } else if (extension === 'webp') {
    return 'image/webp'
  } else if (extension === 'wbmp') {
    return 'image/vnd.wap.wbmp'
  } else if (extension === 'jpeg' || extension === 'jpg') {
    return 'image/jpeg'
  } else if (extension === 'svg' || extension === 'svgz') {
    return 'image/svg+xml'
  } else if (extension === 'tif' || extension === 'tiff') {
    return 'image/tiff'
  } else if (extension === '3gpp' || extension === '3gp') {
    return 'video/3gpp'
  } else if (extension === 'mpeg' || extension === 'mpg') {
    return 'video/mpeg'
  } else if (extension === 'asx' || extension === 'asf') {
    return 'video/x-ms-asf'
  } else if (extension === 'mov') {
    return 'video/quicktime'
  } else if (extension === 'ogg') {
    return 'video/ogg'
  } else if (extension === 'wmv') {
    return 'video/x-ms-wmv'
  } else if (extension === 'webm') {
    return 'video/webm'
  } else if (extension === 'flv') {
    return 'video/x-flv'
  } else if (extension === 'avi') {
    return 'video/x-msvideo'
  } else if (extension === 'm4v') {
    return 'video/x-m4v'
  } else if (extension === 'mng') {
    return 'video/x-mng'
  } else if (extension === 'doc' || extension === 'dot') {
    return 'application/msword'
  } else if (extension === 'docx') {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  } else if (extension === 'dotx') {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.template'
  } else if (extension === 'docm') {
    return 'application/vnd.ms-word.document.macroEnabled.12'
  } else if (extension === 'xls') {
    return 'application/vnd.ms-excel'
  } else if (extension === 'xlsx') {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  } else if (extension === 'xlsb') {
    return 'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
  } else if (extension === 'xlsm') {
    return 'application/vnd.ms-excel.sheet.macroEnabled.12'
  } else if (extension === 'csv') {
    return 'text/csv'
  } else {
    return extension;
  }
}

/**
 * 
 * @param {integer} step 
 * @returns 
 */
// export function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return `For each ad campaign that you create, you can control how much
//                 you're willing to spend on clicks and conversions, which networks
//                 and geographical locations you want your ads to show on, and more.`;
//     case 1:
//       return 'An ad group contains one or more ads which target a shared set of keywords.';
//     case 2:
//       return `Try out different ad text to see what brings in the most customers,
//                 and learn how to enhance your ads using features like ad extensions.
//                 If you run into any problems with your ads, find out how to tell if
//                 they're running and how to resolve approval issues.`;
//     default:
//       return 'Unknown step';
//   }
// }

export function FilesList({ files, className, style, onDelete, children }) {
  const { classes } = useStyles();
  const [showModal, setModalOpen] = useState(false);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  const handleClose = () => {
    setModalOpen(false);
  }

  return <Grid container className={className} style={style}>
    {children && children(() => setModalOpen(!showModal))}
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={showModal || false}
      className={classes.modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={showModal}>
        <Paper className={classes.paper} style={!md ? { maxWidth: '80%' } : { maxWidth: '50%' }}>
          <Grid container className={classes.header} justify="flex-end">
            <CloseIcon onClick={handleClose} className={classes.closeIcon} />
          </Grid>
          <Grid className={classes.gridList}>
            {files && Array.isArray(files) && files.length > 0 && files.map((file, index) => {
              return <Grid key={index} container className={classes.gridContainer}>
                <Grid item xs={10} className={classes.fileName}>
                  <Typography variant="subtitle1" >{file.name}</Typography>
                </Grid>
                <Grid item xs={2} className={classes.gridDelete}>
                  {/* <SVG src={require('images/icons/trash.svg')} className={classes.attachDelete} onClick={() => onDelete(index)} /> */}
                </Grid>
                <Grid item xs={12} ><hr className={classes.hr} /></Grid>
              </Grid>
            }) || <Grid>No Files Found.</Grid>}
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  </Grid>

}

export const FileNameShow = (props) => {
  const { files: filesObj, multiple, multipleFiles, style } = props;

  const { classes } = useStyles();
  const multiUploadedFiles = (multipleFiles || []).map((e, i) => e.name).join(", ");

  return <Grid className={classes.gridList} sx={style}>
    {multiple && multipleFiles.length ?
      <Grid>
        <Typography variant="subtitle1" component="span">
          <span style={{
            fontFamily: 'Poppins-SemiBold'
          }}>{multiUploadedFiles}</span> {multipleFiles.length == 1 ? "is" : "are"} ready for upload.<br /> Click the button below to upload the {multipleFiles.length == 1 ? "file" : "files"}.
        </Typography>
        { }
      </Grid>
      : filesObj && Array.isArray(filesObj) && filesObj.length > 0 && filesObj.map((file, index) => {

        return <Grid key={index} container className={classes.gridContainer}>
          {/* <Grid item xs={10} className={classes.fileName}> */}
          <Typography variant="subtitle1" component="span">
            <span style={{
              fontFamily: 'Poppins-SemiBold'
            }}>{file.name}</span> is ready for upload.<br /> Click the button below to upload the file.
          </Typography>
          {/* </Grid> */}
        </Grid>
      }) || <Grid>No Files Found.</Grid>}
  </Grid>
}