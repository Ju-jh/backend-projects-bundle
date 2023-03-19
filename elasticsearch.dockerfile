FROM elasticsearch

# 한글 형태소 분석기 설치
RUN elasticsearch-plugin install analysis-nori

# elasticsearch.yml 파일 복사
COPY elasticsearch.yml /usr/share/elasticsearch/config/
