<?php

namespace App\Controller\API\Library;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Document\Artist;
use App\Document\Album;
use App\Document\Track;

class TrackController extends AbstractController
{
    /**
     * @Route("/api/library/tracks/get/all", methods={"GET"})
     */
    public function getAll(DocumentManager $dm)
    {
        $tracks = $dm->getRepository(Track::class)->findAll();
        
        $json = array();
        foreach ($tracks as $track)
            $json[] = $track->getProperties();

        return new JsonResponse($json);
    }
}
