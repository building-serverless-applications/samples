import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
//        primary: {
//            main: ''
//        },
        error: {
            main: red[500]
        }
    }
})

export default theme