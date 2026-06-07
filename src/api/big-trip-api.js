export default class BigTripApi {

  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  async _load({url, method = 'GET', body = null, headers = new Headers()}) {

    const response = await fetch(
      `${this._endPoint}/${url}`,
      {
        method,
        body,
        headers: new Headers({
          Authorization: this._authorization,
          ...Object.fromEntries(headers.entries())
        })
      }
    );

    BigTripApi.checkStatus(response);

    return response;
  }

  static checkStatus(response) {

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static parseResponse(response) {
    return response.json();
  }

  async points() {

    const response = await this._load({
      url: 'points'
    });

    return BigTripApi.parseResponse(response);
  }

  async destinations() {

    const response = await this._load({
      url: 'destinations'
    });

    return BigTripApi.parseResponse(response);
  }

  async offers() {

    const response = await this._load({
      url: 'offers'
    });

    return BigTripApi.parseResponse(response);
  }

  async updatePoint(point) {

    const response = await this._load({
      url: `points/${point.id}`,
      method: 'PUT',
      body: JSON.stringify(point),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    return BigTripApi.parseResponse(response);
  }

  async addPoint(point) {

    const response = await this._load({
      url: 'points',
      method: 'POST',
      body: JSON.stringify(point),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    return BigTripApi.parseResponse(response);
  }

  async deletePoint(point) {

    await this._load({
      url: `points/${point.id}`,
      method: 'DELETE'
    });
  }
}
