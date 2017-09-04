// var Validator = require('jsonschema').Validator;
// var v = new Validator();
// var schema = require('./schema');
var shortid = require('shortid');
var crypto = require('crypto');
// var configs = require('../../configs/rest');

module.exports = function(devices) {
  return {
    validateSchema: function(object) {
      return v.validate(object, schema);
    },

    retrievePrototypeDevices: function(query) {
      query.isActive = true;
      return new Promise(function(resolve, reject) {
        return devices.find({ where: query })
        .success(function(data) {
          if (err) return reject();
          return resolve(data);
        })
        .error(function(err) {
          return reject();
        });
      });
    },

    retriveUserDevices: function(query, sort, skip, limit) {

      query.isActive = true;

      return new Promise(function(resolve, reject) {
        if (sort && typeof(skip) === 'number' && limit) {
          return
            devices
            .find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec(function(err, data) {
              if (err) return reject();
              return resolve(data);
            });
        } else {
          return devices.find({ where: query }).success(function(data) {
            // if (err) return reject();
            return resolve(data);
          })
          .error(function(err) {
            return reject();
          })
        }
      });
    },

    retriveAllDevices: function(query, sort, skip, limit) {
      return new Promise(function(resolve, reject) {
        if (sort && typeof(skip) === 'number' && limit) {
          return
            devices
            .find({})
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec(function(err, data) {
              if (err) return reject();
              return resolve(data);
            });
        } else {
          return devices.find({}, function(err, data) {
            if (err) return reject();
            resolve(data);
          });
        }
      });
    },

    addNewDevice: function(field) {
      field.isPublic = false;
      field.isActive = false;
      field.isHeartbeating = false;
      field.createdAt = new Date().getTime();
      field.updatedAt = new Date().getTime();
      field.fwId = '';
      field.isActive = true;
      field.deviceId = shortid.generate();
      field.deviceKey = crypto
        .createHmac('sha256', configs.deviceKey)
        .update(field.createdAt.toString() + field.deviceId)
        .digest('hex');

      var validataSchema = v.validate(field, schema);

      return new Promise( function(resolve, reject) {
        /* validate schema */
        var validataSchema = v.validate(field, schema);

        if (validataSchema.errors.length === 0) {
          return resolve();
        } else {
          return reject({ schema: validataSchema.errors })
        }
      })
      .then(function() {
        /* add new device */
        return new Promise(function(resolve, reject) {
          return devices
          .create(field)
          .success(function(data) {
            return resolve(data);
          })
          .error(function(err) {
            return reject();
          })
        });
      });
    },

    editDevices: function(query, update) {
      update.updatedAt = new Date().getTime();
      return new Promise(function(resolve, reject) {
        return devices
        .update(update, { where: query })
        .success(function(num) {
          return resolve({ message: 'success' });
        })
        .error(function(err) {
          return reject();
        });
      });
    },

    deleteDevice: function(query) {
      var update = {};
      update.updatedAt = new Date().getTime();
      update.isActive = false;
      return new Promise(function(resolve, reject) {
        return devices
        .update(update , { where: query })
        .success(function(err, num) {
          return resolve({ message: 'success' });
        })
        .error(function(err) {
          return reject();
        });
      });
    },
  };
}