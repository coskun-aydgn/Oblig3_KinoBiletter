package com.example.oblig3_kinobiletter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class BiletRepository {
    @Autowired
    private JdbcTemplate db;
    public void lagreBilet(Bilet bilet){
        StringBuilder sb = new StringBuilder();
        sb.append("Insert into BILET (filmNavn,antall,fornavn,etternavn,telefonNr, email) values(?,?,?,?,?,?)");
        db.update(sb.toString(), bilet.getFilmNavn(),bilet.getAntall(),
                bilet.getFornavn(),bilet.getEtternavn(),
                bilet.getTelefonNr(), bilet.getEmail());
    }
    public List<Bilet> hentBiletter() throws SQLException {
        StringBuilder sb = new StringBuilder();
        sb.append("select * from Bilet");
        Connection conn = db.getDataSource().getConnection();
        Statement ps = conn.createStatement();
        ResultSet rs = ps.executeQuery(sb.toString());
        List<Bilet> bilets = new ArrayList<>();
        while(rs.next()) {
            Bilet b = new Bilet(rs.getString(2), rs.getInt(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(7));
            bilets.add(b);
        }
        rs.close();
        return bilets;
    }
    public void slettBiletter(){
        StringBuilder sb = new StringBuilder();
        sb.append("delete from Bilet");
        db.update(sb.toString());
    }
}
