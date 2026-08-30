//export const APIUrl:string = "http://angulartutapi.esoltechserv.com/api/";
export const APIUrl:string = "http://localhost:12472/api/";

export const globalMenus = {

    mainMenu : [
        {menuName :"Transactions", allowRoles : ['sa', 'a']},
        {menuName :"Masters", allowRoles : ['sa', 'a']},
    ],

    menuItems : [
        {
            label : "Dashboard",
            mainMenu : "",
            routeName : "dashboard",
            allowRoles : ['sa', 'a']
        },
        {
            label : "Enquiry",
            mainMenu : "Transactions",
            routeName : "enquirylist",
            allowRoles : ['sa', 'a', 'e']
        },
        {
            label : "State",
            mainMenu : "Masters",
            routeName : "statelist",
            allowRoles : ['sa', 'a']
        }, 
        {
            label : "City",
            mainMenu : "Masters",
            routeName : "citylist",
            allowRoles : ['sa', 'a']
        }
    ]
}