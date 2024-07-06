export interface User {
    name: string;
    email: string;
    //documents: Document[];  // TODO: Will need to carry a list of docs tied to their profile
}
  
export interface Meeting {
    id: string;
    title: string;
    content: string;
    // permissions: {
    //     canView: boolean;
    //     canEdit: boolean;
    // };
}