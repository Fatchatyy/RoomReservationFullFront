export class Pagedetudiants {
    content!: Etudiant[];
    pageable!: Pageable;
    totalElements!: number;
    totalPages!: number;
    last!: boolean;
    first!: boolean;
    numberOfElements!: number;
    size!: number;
    number!: number;
    sort!: Sort;
    empty!: boolean;
   }