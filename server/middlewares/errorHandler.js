module.exports = function(err, req, res, next) {
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(el => el.message);
      res.status(400).json({ message: 'Validation Error', errors });
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      const errors = err.errors.reduce((acc, val) => {
        acc.push(val.message);
        return acc;
      }, []);
      res.status(400).json({ message: 'Validation Error', errors });
    } else if (err.name === 'JsonWebTokenError') {
      res.status(401).json({
        message: 'Authentication failed'
      });
    }
    else {
      res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
      });
    }
  };
  