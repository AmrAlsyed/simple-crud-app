import { useEffect, useState } from "react";
import "./App.css";
import Modalform from "./components/ModalForm.jsx";
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
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/clients/`
      );
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
    if (modalMode === "add") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/clients`,
          newClientData
        );
        setTableData((prevData) => [...prevData, response.data]);
      } catch (error) {
        console.log("Error adding client:", error);
      }
    } else {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/clients/${clientData.id}`,
          newClientData
        );
        setTableData((prevData) =>
          prevData.map((client) =>
            client.id === clientData.id ? response.data : client
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
