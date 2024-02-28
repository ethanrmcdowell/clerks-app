import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  searchGarage(data: any) {
    const params = {
      startDate: data.formatStartDate,
      endDate: data.formatEndDate,
      permitNum: data.permitNum,
      name: data.name,
      address: data.address,
      section: data.section,
      orgName: data.orgName,
      orgAddress: data.orgAddress
    }

    return this.http.get(
      'http://localhost:3000/api/garage/search', { params }
    );
  }

  reportGarage(data: any) {
    const params = {
      startDate: data.formatStartDate,
      endDate: data.formatEndDate,
    }

    console.log("PARAMS", params);

    return this.http.get(
      'http://localhost:3000/api/garage/report', { params }
    );
  }

  updateGarage(data: any) {
    console.log("DATA", data);
  }

  addGarage(data: any) {
    const params = {
      startDate: data.formatStartDate,
      endDate: data.formatEndDate,
      permitNum: data.permitNum,
      name: data.name,
      address: data.address,
      zip: data.zip,
      telephone: data.telephone,
      section: data.section,
      orgName: data.orgName,
      orgAddress: data.orgAddress,
      orgTelephone: data.orgTelephone,
      notes: data.notes,
      timestamp: data.timestamp
    }

    return this.http.get(
      'http://localhost:3000/api/garage/add', { params }
    );
  }

  searchMeetings(data: any) {
    const params = {
      startDate: data.formatStartDate,
      endDate: data.formatEndDate,
      keyword1: data.keyword1,
      keyword2: data.keyword2,
      idNumber: data.idNumber
    }

    return this.http.get(
      'http://localhost:3000/api/meeting/search', { params }
    );
  }

  addMeetings(data: any) {
    const params = {
      meetingDate: data.formatDate,
      reference: data.reference,
      subReference: data.subReference,
      description: data.description,
      timestamp: data.timestamp
    }

    return this.http.get(
      'http://localhost:3000/api/meeting/add', { params }
    )
  }

  searchDeeds(data: any) {
    const params = {
      startDate: data.formatStartDate,
      endDate: data.formatEndDate,
      sidwell: data.sidwell,
      liber: data.liber,
      pageStart: data.pageStart,
      pageEnd: data.pageEnd,
      grantor: data.grantor,
      description: data.description
    }

    return this.http.get(
      'http://localhost:3000/api/deed/search', { params }
    );
  }
}
