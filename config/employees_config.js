export const MIN_SALARY = 5000;
export const MAX_SALARY = 35000;
export const GENDERS = ['male', 'female'];
export const NAMES = {
    'male' : ['Asher', 'Yuri', 'Grigory', 'Eduard',
        'Igor', 'Alex', 'Moses', 'Yakob', 'David', 'Sergey',
        'Ivan'],
    'female' : ['Katya', 'Olga', 'Sara', 'Masha',
        'Irina', 'Polina', 'Rivka', 'Proskovya', 'Nina', 'Margo']
}
export const NAME_MIN_LENGTH = 4;
export const DIGITS_ID = 5;
export const TITLES = ['Developer', 'Development Manager', 'QA Tester', 'QA Manager', 'Sales Person', 'Sales Manager'];
export const PATH_EMPLOYEES = '/employees';
export const PATH_TITLE_STATISTICS = '/title/statistics' ;
export const PATH_SEARCH = '/search';
export const PATH_GENERATION = '/generation';
export const PATH_SALARY_STATISTICS = '/salary/statistics';
export const PATH_LOGIN ='/login';
export const PATH_LOGOUT ='/logout';
export const MAX_EMPLOYEES_ONE_GENERATION = 100;
export const LINKS = [
    {path: PATH_EMPLOYEES, label: 'Employees', admin: false},
    {path: PATH_GENERATION, label: 'Employees Generation', admin: true},
    {path: PATH_SALARY_STATISTICS, label: 'Salary Statistics', admin: false},
    {path: PATH_TITLE_STATISTICS, label: 'Title Statistics', admin: false},
    {path: PATH_SEARCH, label: 'Searching', admin: false},
    {path: PATH_LOGIN, label: 'Sign In', admin: false}
]
export const POLLING_INTERVAL = 1000
export const ACCESS_TOKEN = "employees_accessToken"
export const COLLECTION_EMPLOYEES = "employees";
export const COLLECTION_ADMINISTRATORS = 'administrators';

