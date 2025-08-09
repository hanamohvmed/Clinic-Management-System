import DoctorCard from "../../Components/DoctorCard";

import { useEffect, useState } from "react";
import Filter from "../../Components/Filter";
import Search from "../../Components/Search.Jsx";
import { useNavigate } from "react-router-dom";

function BrowseDoctors() {
  const [specializations, setSpecializations] = useState([]);
  const [selectedOption, setselectedOption] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [doctors, setdoctors] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSpecializations() {
      try {
        const response = await fetch(
          "http://clinicdev.runasp.net/api/Specializations",
          {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong: " + response.status);
        }

        const data = await response.json();
        setSpecializations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSpecializations();
  }, []);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch(
          "http://clinicdev.runasp.net/api/Doctors/search",
          {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed To fetch");
        }
        const data = await response.json();
        const doctorsdata = data.doctors;
        // console.log(doctorsdata);
        setdoctors(doctorsdata);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  function makeappointment(id) {
    navigate(`/home/book-appointment?doctorId=${id}`)
    console.log(id);
  }

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedOption === "" || doctor.specialization === selectedOption)
  );
  return (
    <>
      {loading && <p className="text-black">Loading...</p>}
      {error && <p>Error : {error}</p>}
      <div className="flex flex-col gap-6 m-2.5 p-3 lg:px-28 ">
        {/* Seach&filtering */}
        <div className="flex flex-col lg:flex-row gap-6 m-4" >
          <Search
            searchTerm={searchTerm}
            onSearch={(e) => setsearchTerm(e.target.value)}
          />
          <Filter
            selectedCategory={selectedOption}
            categories={specializations}
            onChangeCategory={(e) => setselectedOption(e.target.value)}
          />
        </div>
        {/* ================ */}
        <div className="flex flex-col  gap-3" >
          {!loading && !error && filteredDoctors.length === 0 ? (
            <>
              <p>No Doctors Founded</p>
            </>
          ) : (
            filteredDoctors.map((doc) => (
              <DoctorCard
                key={doc.id}
                name={doc.fullName}
                bio={doc.bio}
                spec={doc.specialization}
                image={doc.profilePictureUrl}
                clinicAdderss={doc.clinicAddress}
                makeappointment={() => makeappointment(doc.id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default BrowseDoctors;
