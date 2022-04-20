import { useState } from 'react';

import { Container, TextField, Grid, Button } from '@mui/material';

import { useEffect } from "react";
import { ApiService } from '../api/ApiService';

export default function Dashboard(){
    const [weather, setWeather] = useState(''); // Criar uma instancia WEATHER
    const [city, setCity] = useState('');

    const handleChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    function handleGetWeather(){
        ApiService
            .get(`/weather?cityName=${city}`)
            .then((response) => {
                // setWeather(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(`Ocorreu uma falha ao tentar realizar a busca!\n Erro: ${error}`);
            });
    }

    // function handleDelete(id: string){
    //     ApiService
    //         .delete(`/disciplines/${id}`)
    //         .then(() => {
    //             handleGetAllDisciplines();
    //         })
    //         .catch((error) => {
    //             console.log(`Falha ao tentar deletar o aluno!\n Erro: ${error}`);
    //         });
    // }

    return (
        <>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            sx={{
                                width: '100%',
                            }}
                            required
                            id="id_city"
                            label="Insira o Nome da Cidade"
                            type="text"
                            value={city}
                            defaultValue={city}
                            onChange={handleChangeCity}
                        />
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
                </Grid>
            </Container>
        </>
    );
}