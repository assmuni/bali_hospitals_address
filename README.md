# Bali hospital address

### Intro
[PORTO] RESTful API of hospital address in Bali, made with node js, express js and mongo db.
Data source: http://sirs.yankes.kemkes.go.id/rsonline/report/

### Routes
| Method | Route |
| --- | --- |
| POST | `/v2/user/reg` |
| POST | `/auth/login` |
| GET | `/auth/logout` |
| GET | [`/v2/hospital`](https://balihospitaladdress.herokuapp.com/v2/hospital) |
| GET | `/v2/hospital/:id` |
| GET | `/v2/hospital?name=:param` |
| POST | `/v2/hospital` |
| PATCH | `/v2/hospital/:id` |
| DELETE | `/v2/hospital/:id` |

### Change log
We have two version of this API and there is some change or additional in v2 API:
* `+ change folder structure`
* `+ user models and route`
* `+ JWT authentication`
* `+ routing with paramerter and query for hospitals`
* `+ PUT method replaced with PATCH`
* `+ shortening url`

 
### Demo
[balihospitaladdress.herokuapp.com/api/v1.0/hospital](https://balihospitaladdress.herokuapp.com/v2/hospital) 

### To run this app locally :
* Clone this repo
* Run `npm install`
* Open browser and server will be in `http://127.0.0.1:3000/`