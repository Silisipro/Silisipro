import axios from "axios";
const url='https://www.thesportsdb.com//api/v1/json/3/searchteams.php?t='

export const AboutMyFavoriteTeam= async (baseTeam) =>{
    try{
        const response= await axios.get(`${url}${baseTeam}`);
        return response.data
    }
    catch (error) {
        console.log('Error of team check the enter team',error)
        throw error;
    }
};