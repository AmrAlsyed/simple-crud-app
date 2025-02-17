import { useEffect, useState } from "react";
import "./App.css";
import Modalform from "./components/Modalform.jsx";
import NavBar from "./components/NavBar.jsx";
import TableList from "./components/TableList.jsx";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/clients/");
      setTableData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleOpen = (mode, client) => {
    setClientData(client);
    setIsOpen(true);
    setModalMode(mode);
  };
  const handleSubmit = async (newClientData) => {
    console.log(modalMode);
    if (modalMode === "add") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/clients",
          newClientData
        );
        console.log("Client added", response.data);
        setTableData((prevData) => [...prevData, response.data]);
      } catch (error) {
        console.log("Error adding client:", error);
      }
      console.log("Modal mode Add");
    } else {
      console.log("Modal mode Edit");
      console.log("Updating client ID:", clientData.id);
      try {
        const response = await axios.put(
          `http://localhost:3000/api/clients/${clientData.id}`,
          newClientData
        );
        console.log("Client Updated", response.data);
        setTableData((prevData) =>
          prevData.map((client) =>
            client.id == clientData.id ? response.data : client
          )
        );
      } catch (error) {
        console.log("Error updating client", error);
      }
    }
  };

  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <TableList
        onOpen={handleOpen}
        searchTerm={searchTerm}
        setTableData={setTableData}
        tableData={tableData}
      />
      <Modalform
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        clientData={clientData}
      />
    </>
  );
}

export default App;
