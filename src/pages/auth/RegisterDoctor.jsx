import RegisterForm from "../../components/RegisterForm";

export default function RegisterDoctor() {
  return (
    <RegisterForm
      title="Doctor Register"
      switchRoleText="Are you a patient?"
      switchRolePath="/RegisterPatient"
    />
  );
}
