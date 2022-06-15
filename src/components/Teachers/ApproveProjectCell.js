import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";

export default function ApproveProjectCell({
  row,
  setAlertMsg,
  getAllPendingProjects,
  setAlertColor,
}) {
  const [cookies] = useCookies();

  const approveProject = async (e) => {
    try {
      const response = await axios.patch(
        "https://student-project-management.herokuapp.com/projects/approve-project",
        { projectId: row._id },
        {
          headers: {
            authorization: "Bearer " + cookies.teacherToken,"Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.data.status === "success") {
        setAlertColor("green");
        getAllPendingProjects();
        return;
      }
      setAlertColor("red");
      setAlertMsg(response.data.msg);
    } catch (error) {
        console.log("error is ")
        console.log(error)
      setAlertMsg("Server Error. Try again later");
      setAlertColor('red')
    }
  };
  return (
    <div>
      <div key={row._id}>
            {row.isApproved ? (
              <Button style={{ backgroundColor: "limegreen" }}>Approved</Button>
            ) : (
              <Button onClick={approveProject} style={{ backgroundColor: "yellow" }}>Pending</Button>
            )}
          </div>
    </div>
  );
}
