const chai = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const expect = chai.expect;
const config = require('../lib/config')

describe("setConfig", function() {
  let ret_val;

  before(function() {
    process.env.NODE_ENV = "test"
    const creds = fs.readFileSync('test/support/fixtures/credentials', 'utf8');
    sinon.replace(fs, 'readFileSync', sinon.fake.returns(creds));
    ret_val = config.setConfig();
  });

  it("returns an object containing process env RF_CLIENT_ID", function() {
    expect(ret_val.RF_CLIENT_ID).to.equal(process.env.RF_CLIENT_ID);
  });

  it("returns an object containing process env RF_SECRET", function() {
    expect(ret_val.RF_SECRET).to.equal(process.env.RF_SECRET);
  });

  it("returns an object containing process env NODE_ENV", function() {
    expect(ret_val.NODE_ENV).to.equal(process.env.NODE_ENV);
  });

  it("returns an object containing process env RF_BASE_URL", function() {
    expect(ret_val.RF_BASE_URL).to.equal(process.env.RF_BASE_URL);
  });

  describe("when given a valid local config object", function() {
    before(function() {
      const localConfig = {
        RF_CLIENT_ID: "myclientid",
        RF_SECRET: "myothersecret",
        RF_BASE_URL: "http://localhost:3002"
      };

      ret_val = config.setConfig(localConfig);
    });
    
    it("returns an object containing local config RF_CLIENT_ID", function() {
      expect(ret_val.RF_CLIENT_ID).to.equal('myclientid');
    });

    it("returns an object containing local config RF_SECRET", function() {
      expect(ret_val.RF_SECRET).to.equal("myothersecret");
    });
  
    it("returns an object containing local config RF_BASE_URL", function() {
      expect(ret_val.RF_BASE_URL).to.equal("http://localhost:3002");
    });

    it("returns an object containing process env NODE_ENV", function() {
      expect(ret_val.NODE_ENV).to.equal("test");
    });
  });

  describe("when given an invalid local config object", function() {
    before(function() {
      const localConfig = {
        RF_CLIENT_ID: "myclientid",
        RF_BASE_URL: "http://localhost:3002"
      };

      process.env = {
        RF_CLIENT_ID: "otherclientid",
        RF_SECRET: "myenvsecret"
      };

      ret_val = config.setConfig(localConfig);
    });

    it("falls back to the process env RF_CLIENT_ID and RF_SECRET", function() {
      expect(ret_val.RF_CLIENT_ID).to.equal(process.env.RF_CLIENT_ID);
    });

    it("falls back to the default NODE_ENV", function() {
      expect(ret_val.NODE_ENV).to.equal("development");
    });
  });

  describe("when no RF process env vars are set and credentials file is present", function() {
    before(function() {
      process.env = {
        NODE_ENV: "test"
      };

      ret_val = config.setConfig();
    });

    it("returns an object containing the default credentials-file-stored RF_CLIENT_ID", function() {
      expect(ret_val.RF_CLIENT_ID).to.equal("default_client_id");
    });
  });
});