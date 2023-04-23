export class Masks {
  static cpf(event: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    event.currentTarget.maxLength = 14;
    let value = event.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    if (value.length > event.currentTarget.maxLength)
      value = value.substring(0, event.currentTarget.maxLength);
    event.currentTarget.value = value;
    return value;
  }

  static cellPhoneNumber(event: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    event.currentTarget.maxLength = 15;
    let value = event.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    if (value.length > event.currentTarget.maxLength)
      value = value.substring(0, event.currentTarget.maxLength);
    event.currentTarget.value = value;
    return value;
  }

  static onlyLetters(event: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let value = event.currentTarget.value;
    value = value.replace(/[^a-zA-Z\u00C0-\u00FF]+/i, "");
    event.currentTarget.value = value;
    return value;
  }

  static onlyLettersAndSpaces(event: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let value = event.currentTarget.value;
    value = value.replace(/[^a-zA-Z\u00C0-\u00FF ]+/i, "");
    event.currentTarget.value = value;
    return value;
  }

  static onlyNumbers(event: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let value = event.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^[a-zA-Z]+$/, "$1");
    event.currentTarget.value = value;
    return value;
  }
}