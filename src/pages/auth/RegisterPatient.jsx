import RegisterForm from "../../components/RegisterForm";

export default function RegisterPatient() {
  return (
    <RegisterForm
      title="Patient Register"
      switchRoleText="Are you a doctor?"
      switchRolePath="/RegisterDoctor"
    />
  );
}
