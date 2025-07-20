import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      name: 'Befrienders Kenya',
      phone: '+254722178177',
      link: 'tel:+254722178177',
      description: '24/7 emotional support for anyone in distress.'
    },
    {
      name: 'Kenya Red Cross Emergency',
      phone: '1199',
      link: 'tel:1199',
      description: 'Free, 24/7 crisis and emergency support.'
    },
    {
      name: 'Amani Counselling Centre',
      phone: '+254722178133',
      link: 'tel:+254722178133',
      description: 'Professional counseling services.'
    },
    {
      name: 'Chiromo Hospital Group',
      phone: '+254 703 599 000',
      link: 'tel:+254703599000',
      description: 'Mental health hospital and support.'
    },
    {
      name: "GBVRC Nairobi Women's Hospital",
      phone: '+254703019120',
      link: 'tel:+254703019120',
      description: '24/7 support for survivors of gender-based violence.'
    },
    {
      name: 'HAK Helpline (GBV)',
      phone: '1195',
      link: 'tel:1195',
      description: 'National Gender-Based Violence helpline, toll-free, 24/7.'
    },
    {
      name: 'Panic Button',
      description: 'If you are in crisis, call 1199 or your trusted contact immediately.'
    }
  ]);
});

export default router;
