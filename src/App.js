import { useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Registration";
import Home from "./components/Home";
import ShowProjects from "./components/Students/ShowProjects";
import AddTasks from "./components/Students/AddTasks";
import CreateProject from "./components/Students/CreateProject";
import StudentNavbar from "./components/Students/Navbar";
// import ShowDocumentsStudents from "./components/Students/ShowDocuments";
// import ShowPendingProjects from "./components/Students/ShowPendingProjects";
import ShowSingleProject from "./components/Students/ShowSingleProject";
import ShowSingleProjectTeacher from "./components/Teachers/ShowSingleProject";
// import StudentHome from "./components/Students/StudentHome";
import UploadDocument from "./components/Students/UploadDocument";
import TeacherLogin from "./components/TeacherAuth/Login";
import TeacherRegister from "./components/TeacherAuth/Register";
// import Navbar from "./components/Teachers/Navbar";
import ProjectApprovalRequests from "./components/Teachers/ProjectApprovalRequests";
// import ShowApprovedProjects from "./components/Teachers/ShowApprovedProjects";
// import ShowDocuments from "./components/Teachers/ShowDocuments";
// import TeacherHome from "./components/Teachers/TeacherHome";
import EditProject from "./components/Students/EditProject";
import AdminRegister from "./components/Admin/Auth/Registration";
import AdminLogin from "./components/Admin/Auth/Login";
import AdminHome from "./components/Admin/Home";
import ShowTeachersProjects from "./components/Admin/ShowTeachersProjects";
import AdminShowSingleProject from "./components/Admin/ShowSingleProject";
import MidSemMarks from "./components/Teachers/MidSemMarks";
import EditProfile from "./components/Auth/EditProfile";
import ChangePassword from "./components/Auth/ChangePassword";
import ForgetPassword from "./components/Auth/ForgetPassword";
import TeacherChangePassword from "./components/TeacherAuth/TeacherChangePassword";
import TeacherForgetPassword from "./components/TeacherAuth/TeacherForgetPassword";
import TeacherEditProfile from "./components/TeacherAuth/TeacherEditProfile";
import AdminChangePassword from "./components/Admin/Auth/AdminChangePassword";
import AdminForgetPassword from "./components/Admin/Auth/AdminForgetPassword";
import AdminEditProfile from "./components/Admin/Auth/AdminEditProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeUser } from "./store/reducers/user";
function App() {
  const [cookies] = useCookies();
  // // // // // console.log(cookies);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // // // // // console.log("user is ", user);
  // // // // // console.log(!user, "...");

  useEffect(() => {
    if (cookies.user) {
      dispatch(
        changeUser({
          name: cookies.user.name,
          position: cookies.user.position,
          pic: cookies.user.pic,
          email: cookies.user.email,
          _id: cookies.user._id,
        })
      );
    } else {
      dispatch(changeUser(null));
    }
  }, [cookies.user, dispatch]);

  return (
    <BrowserRouter>
      {/* {(cookies.student &&
        cookies.token &&
        cookies.student !== "undefined" &&
        cookies.token !== "undefined") ||
        (cookies.teacher &&
          cookies.teacherToken &&
          cookies.teacher !== "undefined" &&
          cookies.teacherToken !== "undefined") ||
        (cookies.admin &&
          cookies.adminToken &&
          cookies.admin !== "undefined" &&
          cookies.adminToken !== "undefined") ?  <StudentNavbar /> : <span></span>} */}

      {user ? <StudentNavbar></StudentNavbar> : <span></span>}

      {/* {
        cookies.teacher && cookies.token && <Navbar />
      } */}
      <Routes>
        <Route path="/" element={<Home />}></Route>

        {/* Public Routes */}
        {/* Student's Routes */}

        <Route
          path="/register"
          element={
            user && user.position === "student" ? <AddTasks /> : <Register />
          }
        ></Route>
        <Route
          path="/login"
          element={
            user && user.position === "student" ? <AddTasks /> : <Login />
          }
        ></Route>

        {/* Teachers Routes */}
        <Route
          path="/teacher-register"
          element={
            user && user.position === "teacher" ? (
              <ProjectApprovalRequests />
            ) : (
              <TeacherRegister />
            )
          }
        ></Route>
        <Route
          path="/teacher-login"
          element={
            user && user.position === "teacher" ? (
              <ProjectApprovalRequests />
            ) : (
              <TeacherLogin />
            )
          }
        ></Route>
        {/* Admin Routes */}
        <Route
          path="/admin-register"
          element={
            user && user.position === "admin" ? (
              <AdminHome />

            ) : (
              <AdminRegister />

            )
          }
        ></Route>
        <Route
          path="/admin-login"
          element={user && user.position? <AdminHome /> :<AdminLogin /> }
        ></Route>

        {/* Protected Routes */}
        {/* Students Routes */}
        <Route path="/student/">
          <Route
            path="create-project"
            element={
              user && user.position === "student" ? (
                <CreateProject />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route
            path="edit-profile"
            element={
              user && user.position === "student" ? <EditProfile /> : <Login />
            }
          ></Route>
          <Route
            path="change-password"
            element={
              user && user.position === "student" ? (
                <ChangePassword />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route path="forget-password" element={<ForgetPassword />}></Route>

          <Route
            path="edit-project"
            element={
              user && user.position === "student" ? <EditProject /> : <Login />
            }
          ></Route>
          {/* <Route
            path="add-task"
            element={
              cookies.student && cookies.student.position === "student" ? (
                <AddTasks />
              ) : (
                <Login />
              )
            }
          ></Route> */}
          <Route
            path="show-documents"
            element={
              user && user.position === "student" ? (
                <UploadDocument />
              ) : (
                <Login />
              )
            }
          ></Route>

          <Route
            path="show-single-project"
            element={
              user && user.position === "student" ? (
                <ShowSingleProject />
              ) : (
                <Login />
              )
            }
          ></Route>
          {/* Here if u select not approved project then u can edit the title and abstract of the project. */}
          <Route
            path="show-projects"
            element={
              user && user.position === "student" ? <ShowProjects /> : <Login />
            }
          ></Route>
          <Route
            path="home"
            element={
              user && user.position === "student" ? <AddTasks /> : <Login />
            }
          ></Route>
        </Route>

        {/* Teachers Routes */}
        <Route path="/teacher/">
          <Route
            path="home"
            element={
              user && user.position === "teacher" ? (
                <ProjectApprovalRequests />
              ) : (
                <TeacherLogin />
              )
            }
          >
            {" "}
          </Route>
          {/* <Route
            path="show-pending-projects"
            element={
              cookies.teacher && cookies.teacher._id ? (
                <ProjectApprovalRequests />
              ) : (
                <TeacherLogin />
              )
            }
          ></Route> */}
          {/* <Route
            path="show-approved-projects"
            element={
              cookies.teacher && cookies.teacher._id ? (
                <ShowApprovedProjects />
              ) : (
                <TeacherLogin />
              )
            }
          ></Route> */}
          {/* <Route
            path="show-documents"
            element={
              cookies.teacher && cookies.teacher._id ? (
                <ShowDocuments />
              ) : (
                <TeacherLogin />
              )
            }
          ></Route> */}
          <Route
            path="show-single-project"
            element={
              user && user.position === "teacher" ? (
                <ShowSingleProjectTeacher />
              ) : (
                <TeacherLogin />
              )
            }
          ></Route>
          <Route
            path="add-midsem-marks"
            element={
              user && user.position === "teacher" ? (
                <MidSemMarks />
              ) : (
                <TeacherLogin />
              )
            }
          ></Route>

          <Route
            path="change-password"
            element={
              user && user.position === "teacher" ? (
                <TeacherChangePassword />
              ) : (
                <TeacherLogin />
              )
            }
          ></Route>

          <Route
            path="edit-profile"
            element={
              user && user.position === "teacher" ? (
                <TeacherEditProfile />
              ) : (
                <TeacherLogin />
              )
            }
          ></Route>

          <Route
            path="forget-password"
            element={<TeacherForgetPassword />}
          ></Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/">
          <Route path="home" element={<AdminHome />}></Route>
          <Route
            path="show-teachers-projects"
            element={
              user && user.position === "admin" ? (
                <ShowTeachersProjects />
              ) : (
                <AdminLogin />
              )
            }
          ></Route>
          <Route
            path="show-single-project"
            element={
              user && user.position === "admin" ? (
                <AdminShowSingleProject />
              ) : (
                <AdminLogin />
              )
            }
          ></Route>
          <Route
            path="edit-profile"
            element={
              user && user.position === "admin" ? (
                <AdminEditProfile />
              ) : (
                <AdminLogin />
              )
            }
          ></Route>
          <Route
            path="change-password"
            element={
              user && user.position === "admin" ? (
                <AdminChangePassword />
              ) : (
                <AdminLogin />
              )
            }
          ></Route>
          <Route
            path="forget-password"
            element={<AdminForgetPassword />}
          ></Route>
        </Route>
        <Route path="*" element={<h1>Path not found</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
