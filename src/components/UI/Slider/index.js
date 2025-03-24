import Slider from '@mui/material/Slider';

export const SliderComponent = ({ min, max, step = 1, value, onChange }) => {
  return (
    <Slider
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        width: '96%',
        color: '#f39c12',
        height: '4px',
        margin: '0 4px',
        '& .MuiSlider-rail': {
          backgroundColor: '#F5A964',
        },
        '& .MuiSlider-track': {
          backgroundColor: '#C54F1D',
        },
        '& .MuiSlider-thumb': {
          backgroundColor: '#C54F1D',
          width: '16px',
          height: '16px',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      }}
    />
  );
};
