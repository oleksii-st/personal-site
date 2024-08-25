type FormValue = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

type ContactResponse = {
  message?: string;
  id?: string;
};

export const contact = async (request: FormValue): Promise<ContactResponse> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return {
      message: `Something went wrong.`,
    };
  }
};
