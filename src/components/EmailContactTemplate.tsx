interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailContactTemplate = ({ name, email, message }: Readonly<EmailTemplateProps>) => (
  <div>
    <h1>Message from {name}</h1>

    <div className="text-xl">Email: {email}</div>

    <p>{message}</p>
  </div>
);
