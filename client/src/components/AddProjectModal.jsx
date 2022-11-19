import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQuery";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState('new');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  //getClient for select
  const { loading, error, data } = useQuery(GET_CLIENTS)
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }
    addProject(name, description, clientId, status);
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  if (loading) return null;
  if (error) return "Something went wrong";
  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>
          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModal
    Label">
                    New Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-lable">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div className="mb-3">
                        <label className="form-lable">Description</label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-lable">Status</label>
                        <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option value="new"> Not Started</option>
                          <option value="progress"> In Progress</option>
                          <option value="completed"> Completed</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">Client</label>
                        <select name="" id="" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                          <option value="">Select Client</option>
                          {data.clients.map((client) => (
                            <option key={client.id} value={client.id} >
                              {client.name}
                            </option>
                          ))}
                        </select>
                        <button
                          type="Submit"
                          data-bs-dismiss="modal"
                          className="btn btn-primary"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  );
}
