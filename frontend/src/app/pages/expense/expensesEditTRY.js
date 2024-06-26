import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  Snackbar,
  Typography,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { companyServices } from "app/services/companyservices";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";
import { userServices } from "app/services/userservices";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Resizer from "react-image-file-resizer";
import useAuth from "@jumbo/hooks/useJumboAuth";
import { makeStyles } from "@mui/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import { branchServices } from "app/services/branchservices";

let resetFormFunc = null;
const validationSchema = yup.object({
  particular: yup.string("Enter Particular").required("Particular is required"),
  description: yup
    .string("Enter Description")
    .required("Description is required"),
  ammount: yup
    .string("Enter Amount")
    .required("Amount is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(1, "Must be exactly 1 digits")
    .max(10, "Must be exactly 10 digits"),
  remark: yup.string("Enter Remark").required("Remark is required"),
});

const ExpenseEdit = ({ pId, onClose, open }) => {

  console.log("expenses_Id:", pId);
  const eId = pId;
  console.log("expenses_eId:", eId);

  const { authUser } = useAuth();

  const expDetails = useQuery(["Expensesdata", { pId }], async () =>
    branchServices.explist(pId)
  );
  // console.log("Expense details: ", expDetails);

  const expData = expDetails?.data?.data ?? [];

  const expData1 = expData.flat();

  const expensesData = expData1[0];

  // console.log("expData1:",expData1)
  // console.log("expData12:",expData1[0])
  // console.log("expensesData123:", expensesData)

  // console.log("particular:", expensesData?.particular)
  // console.log("remark:", expensesData?.remark)
  // console.log(" ammount:", expensesData?.ammount)
  // console.log("description: ", expensesData?.description)




  // console.log("Expense Data:", expDetails);
  // const ciBData = cDetails?.data?.data?.bankDetails ?? [];

  const [fullWidth, setFullWidth] = React.useState(true);

  const expensesMutation = useMutation(branchServices.updateExpenses, {
    onError(error) {
      console.log(error);
    },
    onSuccess: (data) => {
      // console.log("response from api", data);
      setdOpen(true);
      if (data.status === 200) {
        setSeverity("success");
        setMsg(data.message);
        resetFormFunc();
      } else {
        setSeverity("error");
        setMsg(data.message);
      }
    },
  });

  const onAdd = (
    particular,
    description,
    ammount,
    remark,
    // filename,
    eId,
  ) => {
    expensesMutation.mutate({
      particular,
      description,
      ammount,
      remark,
      // filename,
      eId,
    });
  };
  const [dopen, setdOpen] = useState(false);
  const handleClose = () => {
    setdOpen(false);
  };

  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const liuser = useQuery(["user-list"], userServices.alist);
  const aliuser = liuser.data?.data;
  const dboy = aliuser?.filter((item) => item.role === "deliveryBoy");
  // const vdboy = dboy.filter((item) => item.isApproved === "verify");

  // console.log("dboy", dboy);

  const [source, setSource] = useState("");

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleCapture = async (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        try {
          const file = target.files[0];
          const image = await resizeFile(file);
          // console.log("image", image);
          function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(","),
              mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]),
              n = bstr.length,
              u8arr = new Uint8Array(n);

            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], filename, { type: mime });
          }

          //Usage example:
          const file1 = dataURLtoFile(image, "hello.jpeg");
          // console.log("file1", file1);
          setSource(file1);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  // console.log("source", source);

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
      textAlign: "center",
    },

    input: {
      display: "none",
    },
  }));

  const classes = useStyles();

  return (
    <Div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={false}
        open={open}
        onClose={onClose}

      >

        {
          expDetails.isLoading ? (
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: (theme) => theme.spacing(3),
                m: "auto",
              }}
            >
              <CircularProgress />
              <Typography variant={"h6"} color={"text.secondary"} mt={2}>
                Loading...
              </Typography>
            </Div>
          ) : (
            // <DialogContent>
            <React.Fragment>
              <Typography variant="h1" mb={3}>
                {/* {t("pages.title.contactUs")} */}
              </Typography>
              <Card sx={{ display: "flex", mb: 3.5 }}>
                {/* <Dialog> */}
                <Div
                  sx={{ height: "1000px" }}
                >
                  <CardContent>

                    <Formik
                      validateOnChange={true}
                      validationSchema={validationSchema}
                      initialValues={{
                        particular: expensesData?.particular,
                        description: expensesData?.description,
                        ammount: expensesData?.ammount,
                        remark: expensesData?.remark,
                        // filename: "",
                        eId: "",
                      }}
                      onSubmit={async (data, { setSubmitting, resetForm }) => {
                        resetFormFunc = resetForm;
                        setSubmitting(true);
                        // console.log("submitting");
                        console.log("submitting", data);
                        await onAdd(
                          data.particular,
                          data.description,
                          data.ammount,
                          data.remark,
                          // data.filename = source,
                          data.eId = eId,
                        );

                        setSubmitting(false);
                      }}
                    >
                      {({ isSubmitting, setFieldValue }) => (
                        <Form noValidate autoComplete="off"

                        >

                          <Dialog
                            fullWidth={fullWidth}
                            maxWidth={false}
                            open={open}
                            onClose={onClose}
                          >

                            <CardContent>
                              <Box
                                sx={{
                                  mx: -1,

                                  "& .MuiFormControl-root:not(.MuiTextField-root)":
                                  {
                                    p: 1,
                                    mb: 2,
                                    width: { xs: "100%", sm: "50%" },
                                  },

                                  "& .MuiFormControl-root.MuiFormControl-fluid": {
                                    width: "100%",
                                  },
                                }}
                              >
                                <Typography component={"h2"} variant="h1" mb={3}>  Edit Expense List </Typography>
                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth
                                    id="particular"
                                    name="particular"
                                    label="Particular"
                                    defaultValue={expensesData?.particular}

                                  />
                                </FormControl>

                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth
                                    id="remark"
                                    name="remark"
                                    multiline
                                    rows={4}
                                    label="Remark"
                                    defaultValue={expensesData?.remark}

                                  />
                                </FormControl>

                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth
                                    name="ammount"
                                    label="Ammount"
                                    type="number"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">₹</InputAdornment>
                                      ),
                                    }}
                                    defaultValue={expensesData?.ammount}

                                  />
                                </FormControl>

                                <FormControl className="MuiFormControl-fluid">
                                  <JumboTextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    multiline
                                    rows={4}
                                    label="Description"
                                    defaultValue={expensesData?.description}

                                  />
                                </FormControl>


                                <FormControl className="MuiFormControl-fluid">
                                  <Div sx={{ mt: 1, mb: 2 }}>
                                    <JumboDemoCard
                                      title={"Supporting Documents"}
                                      wrapperSx={{
                                        backgroundColor: "background.paper",
                                        pt: 0,
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          "& > :not(style)": { m: 1, width: "24ch" },
                                        }}
                                      >
                                        <Div className={classes.root}>
                                          <Grid container>
                                            <Grid item xs={12}>
                                              <input
                                                name="filename"
                                                accept="image/*"
                                                className={classes.input}
                                                id="icon-button-file"
                                                type="file"
                                                capture="environment"
                                                onChange={(e) => {
                                                  handleCapture(e.target);
                                                  setFieldValue("filename", source);
                                                }}
                                              />

                                              <label htmlFor="icon-button-file">
                                                <IconButton
                                                  color="primary"
                                                  aria-label="upload picture"
                                                  component="span"
                                                >
                                                  <PhotoCameraRoundedIcon
                                                    fontSize="large"
                                                    color="primary"
                                                  />
                                                </IconButton>
                                              </label>
                                              {/* <Div>
                                             <img src={source}></img>
                                           </Div> */}
                                            </Grid>
                                          </Grid>
                                        </Div>
                                      </Box>
                                    </JumboDemoCard>
                                  </Div>
                                </FormControl>


                                <Div sx={{ mx: 1 }}>
                                  <LoadingButton
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ mb: 3 }}
                                    loading={
                                      isSubmitting || expensesMutation.isLoading
                                    }
                                  >
                                    Submit
                                  </LoadingButton>
                                  {console.log("isSubmitting", isSubmitting)}
                                  <Snackbar
                                    open={dopen}
                                    autoHideDuration={6000}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "right",
                                    }}
                                  >
                                    <Alert
                                      variant="filled"
                                      onClose={handleClose}
                                      severity={severity}
                                      sx={{ width: "100%" }}
                                    >
                                      {msg}
                                    </Alert>
                                  </Snackbar>
                                </Div>
                              </Box>
                            </CardContent>
                            <DialogActions>
                              <Button onClick={onClose}>Close</Button>
                            </DialogActions>
                          </Dialog>
                        </Form>
                      )}
                    </Formik>
                  </CardContent>
                </Div>
                {/* </Dialog> */}
              </Card>
            </React.Fragment>
          )
          // </DialogContent>
        }



      </Dialog>

    </Div>
  );
};

export default ExpenseEdit;
