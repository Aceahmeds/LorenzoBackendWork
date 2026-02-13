// const ErrorHandler = ( err,req,res,next) =>{

//     res.status(200).json({
//         success:false,
//         message:err.message
//     })

// }
// export default ErrorHandler
const ErrorHandler = (err, req, res, next) => {
  console.log(err); // <-- backend me error ka exact message dekho
  res.status(500).json({
    success: false,
    message: err.message || "Server Error"
  });
};

export default ErrorHandler;
