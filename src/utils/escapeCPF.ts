export const escapeCPF = (cpf: string) => {
    return cpf.replace(/\.|-/gm, '');
}