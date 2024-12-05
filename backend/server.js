
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chakradhar', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));
