const express = require('express');
const app = express();

// Import all your route handlers
const usersRoutes = require('./routes/usersRoutes');
const videosRoutes = require('./routes/videosRoutes');
const downloadsRoutes = require('./routes/downloadsRoutes');
const drmRoutes = require('./routes/drmRoutes');
const licenseesRoutes = require('./routes/licenseesRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
const playlistsRoutes = require('./routes/playlistsRoutes');
const reportsRoutes = require('./routes/reportsRoutes');
const rewardsRoutes = require('./routes/rewardsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const streamsRoutes = require('./routes/streamsRoutes');
const transcodingsRoutes = require('./routes/transcodingsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');

// Use the route handlers
app.use('/users', usersRoutes);
app.use('/videos', videosRoutes);
app.use('/download', downloadsRoutes);
app.use('/drm', drmRoutes);
app.use('/licence', licenseesRoutes);
app.use('/payment', paymentsRoutes);
app.use('/playlist', playlistsRoutes);
app.use('/report', reportsRoutes);
app.use('/reward', rewardsRoutes);
app.use('/search', searchRoutes);
app.use('/stream', streamsRoutes);
app.use('/transcoding', transcodingsRoutes);
app.use('/booking', bookingsRoutes);

module.exports = app;
