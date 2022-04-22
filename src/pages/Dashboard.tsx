import { useState } from 'react';
import { Container, Grid, Button, Typography, Paper, Card, CardContent } from '@mui/material';
import { ApiService } from '../api/ApiService';
import { WeatherInterface } from '../types/types';
import { TextFieldCustom } from '../ui/styles/TextField';

export default function Dashboard(){
    const [weather, setWeather] = useState<WeatherInterface>();
    const [city, setCity] = useState('');

    const handleChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    function handleGetWeather(){
        ApiService
            .get(`/weather?cityName=${city}`)
            .then((response) => {
                setWeather(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(`Ocorreu uma falha ao tentar realizar a busca!\n Erro: ${error}`);
            });
    }

    function handleDay(day: string){
        switch(day){
            case "Seg":
                return "Segunda-Feira";
            case "Ter":
                return "Terça-Feira";
            case "Qua":
                return "Quarta-Feira";
            case "Qui":
                return "Quinta-Feira";
            case "Sex":
                return "Sexta-Feira";
            case "Sáb":
                return "Sábado";
            case "Dom":
                return "Domingo";
        }
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Container 
                        sx={{
                            paddingTop:'40px',
                        }}
                    >
                        <TextFieldCustom
                            sx={{
                                width: '70%',
                            }}
                            required
                            id="id_city"
                            label="Insira o Nome da Cidade"
                            type="text"
                            value={city}
                            defaultValue={city}
                            onChange={handleChangeCity}
                        />
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        sx={{
                            mt: { xs: 2, md: 0 }, 
                            backgroundColor: '#7063C0',
                            '&:hover': {
                                background: '#6153bb' ,
                                opacity: 0.5
                            },
                        }}
                        variant="contained"
                        onClick={() => {
                            handleGetWeather()
                        }}
                    >
                        Buscar
                    </Button>
                </Grid>
                {weather ? (
                    weather.forecast.map((item) => (
                        <Grid item xs={12} md={4} key={item.date}
                            sx={{
                                pb: 2, 
                                color: '#48539b',
                            }}
                        >
                            <Container>
                                <Paper elevation={3}
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Card
                                        sx={{
                                            backgroundColor: "#151c46",
                                            border: '1px solid',
                                            borderColor: '#48539b',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <CardContent sx={{ height: '100%' }} >
                                            <Typography 
                                                sx={{
                                                    pb: 2, 
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignContent: 'start',
                                                    justifyContent: 'start'
                                                }}
                                            >
                                                {handleDay(item.weekday)} ( {item.description} ) 
                                            </Typography>

                                            <Grid container spacing={3} xs={12}>
                                                <Grid item xs={3}>
                                                    <Typography
                                                        sx={{
                                                            color: '#48539b',
                                                        }}
                                                        align='center'
                                                    >
                                                        Mínima
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            color: '#48539b'
                                                        }}
                                                        align='center'
                                                    >
                                                        {item.min}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography
                                                        sx={{
                                                            color: '#48539b',
                                                        }}
                                                        align='center'
                                                    >
                                                        Máxima
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            color: '#48539b',
                                                        }}
                                                        align='center'
                                                    >  
                                                        {item.max}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography
                                                        sx={{
                                                            color: '#48539b',
                                                        }}
                                                    >
                                                        Data: {item.date}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Container>
                        </Grid>
                    ))) : (
                        <></>
                    )
                }
            </Grid>
        </>
    );
}