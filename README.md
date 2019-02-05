# Bali hospital address

### Intro
[PORTO] RESTful API of hospital address in Bali, made with node js, express js and mongo db.
Data source: http://sirs.yankes.kemkes.go.id/rsonline/report/

### Routes
| Method | Route | Purpose | Need token |
| --- | --- | --- | :---: |
| POST | `/v2/user/reg` | register new user | No |
| POST | `/auth/login` | send login data | No |
| GET | `/auth/logout` | logout session | No |
| GET | [`/v2/hospital`](https://balihospitaladdress.herokuapp.com/v2/hospital) | get all hospital | Yes |
| GET | `/v2/hospital/:id` | get hospital address by Id | Yes |
| GET | `/v2/hospital?name=:param` | get hospital address with name as query string | Yes |
| POST | `/v2/hospital` | send new hospital data | Yes |
| PATCH | `/v2/hospital/:id` | edit hospital by Id | Yes |
| DELETE | `/v2/hospital/:id` | delete hopital by Id | Yes |

### Change log
We have two version of this API and there is some change or additional in v2 API:
* `+ change folder structure`
* `+ user models and route`
* `+ JWT authentication`
* `+ routing with paramerter and query for hospitals`
* `+ PUT method replaced with PATCH`
* `+ shortening url`

### Demo
[balihospitaladdress.herokuapp.com/v2/hospital](https://balihospitaladdress.herokuapp.com/v2/hospital) 

### To run this app locally :
* Clone this repo
* Run `npm install`
* Open browser and server will be in `http://127.0.0.1:3000/`

### To access the route
You need jwt token to access several route, first go to `https://balihospitaladdress.herokuapp.com/v2/user/reg` to register your user account, send a body json with name, email and password inside, after that you can loggin to `https://balihospitaladdress.herokuapp.com/auth/login` with email and password as a body json and jwt token will provided. Put the token in headers as Authorization and you will have access the route.