import React, { useState } from "react";
import { useParams } from "react-router-dom";
import filterIcon from "../../assets/svgs/filtericon.svg";
import { BsDownload } from "react-icons/bs";
import CreateUserModal from "../../components/Admin/UserManagement/CreateUserModal";
import addUsersIcon from "../../assets/svgs/adduser.svg";
import Button from "../../shared/Button";
import UserList from "../../components/Admin/UserManagement/UserList";
import FilterModal from "../../components/Admin/UserManagement/FilterModal";
import downArrowIcon from "../../assets/svgs/downArrWhiteSolid.svg";
import CreateUserManual from "../../components/Admin/UserManagement/CreateUserManual";
import UploadCsvModal from "../../shared/UploadCsvModal";
import ScanNetwork from "../../shared/ScanNetwork";
import UserFlow from "../../components/Admin/UserManagement/UserFlow";
import NetworkScanFlow from "../../components/Admin/UserManagement/NetworkScanFlow";
import HeaderTitle from "../../shared/HeaderTitle";
import searchIcon from "../../assets/svgs/search.svg";
import PagesHomeLayout from "../../shared/PagesHomeLayout";

// Define FilterConfig interface
interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "date" | "text"; // Only allow these types
  options?: { label: string; value: string }[]; // Only for "select" type
}

interface SelectedFilters {
  simulationScore: string;
  department: string;
  status: string;
}

const UserManagement = ({ label, onClick }) => {
  const { type } = useParams<{ type: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [uploadCsv, setUploadCsv] = useState(false);
  const [scanNetwork, setScanNetwork] = useState(false);

  // State to hold the selected filter values
  const [selectedFilters, setSelectedFilters] = useState({
    simulationScore: "",
    department: "",
    status: "",
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleManual = () => {
    setIsModalOpen(true);
    console.log("Add User button clicked");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadCsv(false);
    setScanNetwork(false);
  };

  const handleExportClick = () => {
    setImportCsv((prev) => !prev);
    setExportCsv((prev) => !prev);
  };

  const handleFilterClick = () => {
    setIsFilterModalOpen((prev) => !prev);
    console.log("Filter button clicked");
  };

  const handleFilterChange = (key: string, value: string) => {
    // Update selected filter value based on key (filter)
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Define your filters array
  const filters: FilterConfig[] = [
    {
      key: "department",
      label: "Department",
      type: "select", // Correct type here
      options: [
        { label: "HR", value: "hr" },
        { label: "Engineering", value: "engineering" },
        { label: "Marketing", value: "marketing" },
      ],
    },
    {
      key: "status",
      label: "Training Status",
      type: "select",
      options: [
        { label: "Completed", value: "completed" },
        { label: "Pending", value: "pending" },
        { label: "Not Started", value: "not_started" },
      ],
    },
    {
      key: "category",
      label: "Assigned Asset category",
      type: "select",
      options: [
        { label: "Hardware", value: "hardware" },
        { label: "Software", value: "software" },
        // { label: "Not Started", value: "not_started" },
      ],
    },
    {
      key: "simulationScore",
      label: "Simulation Score",
      type: "select",
      options: [
        { label: "5%-20%", value: "5%-20%" },
        { label: "20% - 40%", value: "20%-40%" },
        { label: "40% - 60%", value: "40%-60%" },
        { label: "60% - 80%", value: "60%-80%" },
        { label: "80% - 100%", value: "80%-100%" },
      ],
    },
  ];

  return (
    <div>
      {activeUser ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center gap-4">
            <img
              src={addUsersIcon}
              alt="Add Users Icon"
              className="w-[288.25px]"
            />
            <p className="text-[#464646]">
              Nothing here, add/upload your employees
            </p>
            <Button label="Add User"></Button>
          </div>
          {isModalOpen && <CreateUserModal onClose={handleCloseModal} />}
        </div>
      ) : (
        <div>
          <div className="relative mb- flex justify-between items-center">
            <HeaderTitle
              title="User Management"
              subTitle={
                type === "Admin"
                  ? "Add or view admin users"
                  : "Add or view users"
              }
            ></HeaderTitle>

            {/* Dropdown Button Wrapper */}
            <div className="relative">
              <div
                className="bg-primary500 py-[10px] text-center rounded-lg text-white w-[180px] cursor-pointer flex items-center justify-center gap-2 "
                onClick={toggleDropdown}
              >
                Add {type === "admin" ? "Admin" : "User"}
                <img src={downArrowIcon} alt="" />
              </div>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute top-[82%] right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    className="w-full text-left px-4 py-2 border-b text-textColor hover:bg-blue50"
                    onClick={() => {
                      setIsOpen(false);
                      handleManual();
                    }}
                  >
                    Manual
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 border-b text-textColor hover:bg-blue50"
                    onClick={() => {
                      setIsOpen(false);
                      setUploadCsv(true);
                    }}
                  >
                    Upload CSV
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 border-b text-textColor hover:bg-blue50"
                    onClick={() => {
                      setIsOpen(false);
                      setScanNetwork(true);
                    }}
                  >
                    Scan network
                  </button>
                </div>
              )}
            </div>
          </div>

          <PagesHomeLayout
            onFilterClick={handleFilterClick}
            onExportClick={handleExportClick}
            showFilter={true}
            showExport={true}
          >
            <UserList />

            {/* Your content */}
          </PagesHomeLayout>

          {/* Modals */}
          {isModalOpen && <CreateUserManual onClose={handleCloseModal} />}
          {uploadCsv && <UploadCsvModal onClose={handleCloseModal} />}
          {scanNetwork && <NetworkScanFlow onClose={handleCloseModal} />}
          {isFilterModalOpen && (
            <FilterModal
              filters={filters}
              handleFilterClick={() => setIsFilterModalOpen(false)} // Close filter modal
              onApplyFilters={(filters) => console.log(filters)} // Log selected filters
              selectedFilters={selectedFilters} // Pass selected filters
              handleFilterChange={handleFilterChange} // Handle filter value changes
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
