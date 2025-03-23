interface BookState {}

interface BookGetters {}

interface BookActions {}

export type BookStore = BookState & BookGetters & BookActions;
