import { Messages } from '../index';
const nock = require('nock');

const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
'MIIEpQIBAAKCAQEAwCtQ1cAYp7tNiA0SojsVgiO9DwsLhs5ZOEkKa72RFPBUS7fD\n' +
'BA2cZqJha+7ZtDnQRThIaGHnXbZSABIffAB67+jBB1sg/ublYf4mvT8qXUj2MUs6\n' +
'ft7jBarIeXAo8xFC7Bdbj0GRGUsTD74ZT9R/XF3t1qYomqu9PCeRK3BwEykAVogF\n' +
'Q5z2D3KiMcKPw+YmdPpzoj643fK/UrWzAVwUPTWDeLvj3JIVrYKkkbiDO2oqZzVF\n' +
'uZ0qBbe+9aWQW4QqAavSAIxWszr9Wn0LontOwZ0oUBl7TiPvCb1mqMzsq4R8ghWV\n' +
'G/CxH4n/p2ktGwxvs+e6JGHCpCohq6SACU7R9wIDAQABAoIBAQCGewmjvD3Ey7/z\n' +
'MOrUWzKvEyGQMHONkERBrmO7iDrKg3EKV/wCjx/fd01kAg+aH0dP2ZZabgFCxH9Y\n' +
'C1a7KX7e+2xyIGTT3XOzAu/LSjP0ekXHs1SpSoNnCOAok8QkbfT+UU5Cz2iiYbZi\n' +
'Mu91vUivtA/oQflyXDMesLXXx2S3EqhEdBCKuS09FetDGdJdx6/x9BiFPNkBQBvJ\n' +
'RYoCGh+gjnQB0GstAaFeSj/61q7pdOWBqma/POj7Gjki/Xsctq1QYzkEgLbBrSya\n' +
'4nJW237YbTY42vHaENtVMSx3MYPnUSCyKttTlDLoPw5t3nJz40bpRKcQqsIOfP75\n' +
'mdNmXct5AoGBAO1Bzc7D4NDATjCQXCxzgqRrup8YD/pqhhmU3Ry9QfADDnOVYsDo\n' +
'zU9VCE001wiXyCoA8yae1yOJtc6WJNMH5ksaJV/l8paNKb9Bom4HtbdML43EODwl\n' +
'c0XlqFnOu7qYYMpnS7vQZFek7V7VRPYBcG48F35kT+1iC9v93dIrdee1AoGBAM9Z\n' +
'rCWMT/m2qB+G7MBdlAspYj7G8Fq2x6R0pNpYG1CxoxT0dEOrrLcHjIUScAj8jXjE\n' +
'yvmL3+3vdhQ5WmckVBhp62nT25qMF7dHTkaWadEQUX7ZU7Wn4pf4jsrFnYt9wJ+g\n' +
'iZft54JrVaPhUEg2S8YB1/fM/K3tX9syPtbnOUZ7AoGBAOuHu+xbgD876WNErHxk\n' +
'X3kiiS2PEa2jOmUC5060g1Tlc99CmbqwYcEzxP4ASsh5BXjNYJUicqkQ+K+RVhU5\n' +
'bmF4H0pIWL8kfCEl4z4f4UGKHFs8RCdRdlIZXztog+0FgHDugrx8cGChlhPi3Ibr\n' +
'ftWwShJrOv2JrAREzYTrKC1RAoGBAJCfnCmoX1PuKf+rbVCTNKJAYC0nNxgeqssz\n' +
'LJS6pXq4G+aOxtU4VcRnuIRMouYxuT9GC8jY3fyobDSY+Ew+k4Vfw3pR8bcvBY+p\n' +
'ZZhoazAN8LnIPdHTYoHbNUWLZmKX+JWeNLpKjpJx6Q7gJc3oSRu3x3ooeQmbKqPJ\n' +
'vPjJ2DInAoGAVoUHP6mBbpo7mKXr4cKSkWn5ix3EvghKM5Gf/VDKg79L/rtzqZ+C\n' +
'IvM1ILqlbA0g/ZL5NKTnNpFnovijpjrAUHN7VdrNeG0OGrD6PQIN99Ojn1/9JFUh\n' +
'b2TCbujQ82PN8J2CBl9FGvTf/gt0UTKAEQrXZdiqH7YQWmg+WYSxcK0=\n' +
'-----END RSA PRIVATE KEY-----';

const getResponse = {
  reference: 'uuuuu-uuuuu-iiiii-ddddd',
};

it('1. using the service before creating the instance', async () => {
  expect(() => {
    Messages.instance.send({wow: "blah"});
  }).toThrow('You have to create an instance before using it.');
});

it('2. send a message to the messaging service', async () => {
  const messages = Messages.create(privateKey, 'NOTIFICATION', 'https://messages.practera/lol');
  const messages2 = Messages.create(privateKey, 'NOTIFICATION', 'https://messages.practera/lalazzzz');
  expect(messages).toEqual(messages2);
  nock('https://messages.practera')
    .post('/lol')
    .reply(200, getResponse)
  const response = await messages.send({wow: "blah"});
  expect(response).toMatchSnapshot();
  Messages.delete();
});

it('3. send a message to the messaging service', async () => {
  nock('https://messages.practera.com')
    .persist()
    .post('/api')
    .reply(200, getResponse)
  const messages = Messages.create(privateKey, 'NOTIFICATION');
  const response = await messages.send({message: 'Hello World !!'});
  const response2 = await Messages.instance.send({message: 'Hello Practera !!'});
  expect(response).toMatchSnapshot();
  expect(response2).toMatchSnapshot();
});

