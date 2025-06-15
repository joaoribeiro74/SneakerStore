import promptSync from "prompt-sync";

export default class InputUtils {
  private static prompt = promptSync();

  static getInput(promptText: string): string {
    while (true) {
      const input = this.prompt(promptText).trim();
      if (input.length > 0) {
        return input;
      }
      console.log("Este campo é obrigatório.");
    }
  }

  static getValidEmailInput(promptText: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    while (true) {
      const input = this.prompt(promptText).trim();
      if (emailRegex.test(input)) {
        return input;
      }
      console.log("E-mail inválido. Use o formato nome@dominio.com");
    }
  }

  static getValidCepInput(promptText: string): string {
    const cepRegex = /^\d{5}-?\d{3}$/;
    while (true) {
      const input = this.prompt(promptText).trim();
      if (cepRegex.test(input)) {
        return input;
      }
      console.log("CEP inválido. Use o formato 00000-000 ou 00000000.");
    }
  }

  static getValidStateInput(promptText: string): string {
    const stateRegex = /^[A-Za-z]{2}$/;

    while (true) {
      const input = this.prompt(promptText).trim();

      if (stateRegex.test(input)) {
        return input.toUpperCase();
      }

      console.log(
        "Estado inválido. Digite a sigla com duas letras (ex: SP, RJ, PR)."
      );
    }
  }

  static getOptionalInput(promptText: string): string | null {
    const input = this.prompt(promptText).trim();

    return input.length === 0 ? null : input;
  }

  static getValidPriceInput(promptText: string): string {
    const priceRegex = /^\d+([.,]\d{1,2})?$/;

    while (true) {
      const input = this.prompt(promptText).trim();

      if (priceRegex.test(input)) {
        return input.replace(",", "."); // normaliza para ponto
      }

      console.log(
        "Preço inválido. Use o formato 100 ou 100.99 (máximo 2 casas decimais)."
      );
    }
  }

  static getValidDateInput(promptText: string): string {
    const dateRegex =
      /^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[0-2])[-](19|20)\d{2}$/;

    while (true) {
      const input = this.prompt(promptText).trim();

      if (dateRegex.test(input)) {
        return input;
      }

      console.log("Data inválida. Use o formato dd-mm-yyyy (ex: 25-12-2024).");
    }
  }
}
