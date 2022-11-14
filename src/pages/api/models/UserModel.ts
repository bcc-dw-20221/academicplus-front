type TypeType = ["student" | "teacher" | "education_manager" | "coordinator"];

export interface PersonalInformationModel {
  id?: string;
  name: string;
  cpf: string;
  sex: "M" | "F" | "O";
  motherName: string;
  email: string;
  password: string;
  birthDate: string;
  address: {
    country: string;
    city: string;
    street: string;
    number: string;
    complement?: string;
  };
}
